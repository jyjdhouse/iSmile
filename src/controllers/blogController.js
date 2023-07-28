const db = require('../database/models/');
const getBlog = require('../utils/getBlog');
const getAllBlogs = require('../utils/getAllBlogs');
const fs = require('fs')
const path = require('path')
const showdown = require('showdown');
const TurndownService = require('turndown');
const turndownService = new TurndownService();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const getDeepCopy = require('../utils/getDeepCopy')
const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const sharp = require('sharp')

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
// Creo el objeto
const s3 = new S3Client({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey
    },
    region: bucketRegion
});


const controller = {
    list: async (req, res) => { //Metodo que devuelve todos los blogs
        try {
            let blogs = getDeepCopy(await getAllBlogs());
            for (let i = 0; i < blogs.length; i++) {
                const blog = blogs[i];
                if (blog.files?.length && blog.files) {
                    for (let j = 0; j < blog.files.length; j++) {
                        const file = blog.files[j];
                        const getObjectParams = {
                            Bucket: bucketName,
                            Key: `blog/${file.filename}`
                        }
                        const command = new GetObjectCommand(getObjectParams);
                        const url = await getSignedUrl(s3, command, { expiresIn: 1800 }); //30 min
                        file.file_url = url; //en el href blog.files[x].file_url
                    }
                }
            };

            return res.render('blogList', { blogs })
        } catch (error) {
            console.log(`Falle en blogController.list: ${error}`);
            return res.json(error);
        }
    },
    detail: async (req, res) => {//Metodo que devuelve blog en especifico
        try {
            const { blogId } = req.params
            let blog = getDeepCopy(await getBlog(blogId));
            // si tiene archivos
            if (blog.files) {
                for (let i = 0; i < blog.files.length; i++) {
                    const file = blog.files[i];
                    const getObjectParams = {
                        Bucket: bucketName,
                        Key: `blog/${file.filename}`
                    }
                    const command = new GetObjectCommand(getObjectParams);
                    const url = await getSignedUrl(s3, command, { expiresIn: 1800 }); //30 min
                    file.file_url = url; //en el href blog.files[x].file_url
                }
            };
            return res.render('blog', { blog })
        } catch (error) {
            console.log(`Falle en blogController.detail: ${error}`);
            return res.json(error);
        }

    },
    createBlog: (req, res) => {
        return res.render('createBlog')
    },
    processBlogCreation: async (req, res) => {
        try {
            let { title, text, mainImage, author } = req.body;
            const files = req.files;
            mainImage = files.find(file => file.originalname == mainImage);
            console.log(files, mainImage);

            const convertToHtml = () => { // este showdown es para convertir el html a markdown, y conservar el formato
                var converter = new showdown.Converter();
                var htmlText = converter.makeHtml(text);
                return htmlText
            };

            const blogObject = {
                title,
                text: convertToHtml(),
                author,
                createdAt: Date.now()
            }


            const newBlog = await db.Blog.create(blogObject);
            let filesObjectDB = [];
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                let isMainImage = file == mainImage ? 1 : 0;
                let fileType = file.mimetype.startsWith('video/') ? 2 : 1;
                let randomName, buffer;
                if (fileType == 1) {//FOTO
                    // Creo el nombre unico para la foto (dentro del forEach)
                    randomName = 'blog-' + Math.random().toString(36).substring(2, 2 + 10) + '.webp';
                    // Cambio el formato a webp y redimensiono la imagen, total la de los productos 
                    //  no se necesita tan gde      .resize({ height: 1920, width: 1080, fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
                    buffer = await sharp(file.buffer).toFormat('webp').toBuffer();

                } else {//VIDEO
                    // Creo el nombre unico para el video
                    randomName = 'blog-' + Math.random().toString(36).substring(2, 2 + 10) + path.extname(file.originalname);
                    buffer = file.buffer;
                }
                // El objeto de la imagen que voy a subir
                const params = {
                    Bucket: bucketName,
                    Key: `blog/${randomName}`,//Esto hace que se guarde en la carpeta product
                    Body: buffer,
                    ContentType: file.mimetype
                };
                const command = new PutObjectCommand(params);
                await s3.send(command);
                // Armo el objeto para la db
                filesObjectDB.push({
                    filename: randomName,
                    blog_id: newBlog.id,
                    file_types_id: fileType,
                    main_image: isMainImage,
                })
            }

            await db.BlogImage.bulkCreate(filesObjectDB);
            return res.redirect(`blog/${newBlog.id}`)
        } catch (error) {
            console.log(`Falle en blogController.processCreation: ${error}`);
            return res.json(error);
        }
    },
    update: async (req, res) => {
        const blogId = req.params.blogId
        const blog = getDeepCopy(await getBlog(blogId));
        if(blog.files){
            for (let i = 0; i < blog.files.length; i++) {
                const file = blog.files[i];
                const getObjectParams = {
                    Bucket: bucketName,
                    Key: `blog/${file.filename}`
                }
                const command = new GetObjectCommand(getObjectParams);
                const url = await getSignedUrl(s3, command, { expiresIn: 1800 }); //30 min
                file.file_url = url; //en el href blog.files[x].file_url
            }
        }
        const markdown = turndownService.turndown(blog.text)
        const blogToUpdate = { ...blog, text: markdown }
        // return res.send(blogToUpdate);
        return res.render('updateBlog', { blogToUpdate })
    },
    processBlogUpdate: async (req, res) => {
        try {

            const blogId = req.params.blogId;
            const blogToUpdate = getDeepCopy(await getBlog(blogId));
            const files = req.files;
            let { title, text, mainImage, author, current_imgs } = req.body;



            const convertToHtml = () => { // este showdown es para convertir el html a markdown, y conservar el formato
                var converter = new showdown.Converter();
                var htmlText = converter.makeHtml(text);
                return htmlText
            };

            const blogObject = {
                title: title,
                text: convertToHtml(),
                author: author,
                createdAt: Date.now()
            }

            await db.Blog.update(blogObject, {
                where: {
                    id: blogToUpdate.id
                }
            });

            let filesObjectToUpdate = blogToUpdate.files.map(file => {
                let isMainImage = file.filename == mainImage ? 1 : 0;
                return {
                    id: file.id,
                    filename: file.filename,
                    blog_id: blogToUpdate.id,
                    main_image: isMainImage,
                    file_types_id: file.file_types_id
                }
            });
            // Esto es para crear las nuevas fotos en AWS
            let fileListToCreate = [];
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                let isMainImage = file.originalname == mainImage ? 1 : 0;
                let fileType = file.mimetype.startsWith('video/') ? 2 : 1;
                let randomName, buffer;
                if (fileType == 1) {//FOTO
                    // Creo el nombre unico para la foto (dentro del forEach)
                    randomName = 'blog-' + Math.random().toString(36).substring(2, 2 + 10) + '.webp';
                    // Cambio el formato a webp y redimensiono la imagen, total la de los productos 
                    //  no se necesita tan gde      .resize({ height: 1920, width: 1080, fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
                    buffer = await sharp(file.buffer).toFormat('webp').toBuffer();

                } else {//VIDEO
                    // Creo el nombre unico para el video
                    randomName = 'blog-' + Math.random().toString(36).substring(2, 2 + 10) + path.extname(file.originalname);
                    buffer = file.buffer;
                }
                // El objeto de la imagen que voy a subir
                const params = {
                    Bucket: bucketName,
                    Key: `blog/${randomName}`,//Esto hace que se guarde en la carpeta product
                    Body: buffer,
                    ContentType: file.mimetype
                };
                const command = new PutObjectCommand(params);
                await s3.send(command);
                // Armo el objeto para la db
                fileListToCreate.push({
                    filename: randomName,
                    blog_id: blogToUpdate.id,
                    main_image: isMainImage,
                    file_types_id: fileType,
                })
            }


            let arrayWithFiles = [...filesObjectToUpdate, ...fileListToCreate]

            await db.BlogImage.bulkCreate(arrayWithFiles, {
                updateOnDuplicate: ["main_image"] // update on duplicate busca por primary key y en caso de encontrar cambia el campo que se le pasa
            });

            let filesToDelete = [];

            const filesToDeleteFilter = blogToUpdate.files.filter(file => { //FILTER TO DELETE IMAGES 
                if (!current_imgs.includes(file.filename)) {
                    return filesToDelete.push(file.filename)
                }
            });

            if (filesToDeleteFilter.length > 0) {

                for (let i = 0; i < filesToDelete.length; i++) {
                    const filename = filesToDelete[i];
                    const params = {
                        Bucket: bucketName,
                        Key: `blog/${filename}`
                    };
                    const command = new DeleteObjectCommand(params);
                    // Hago el delete de la base de datos
                    await s3.send(command);
                }               
                await db.BlogImage.destroy({
                    where: {
                        filename: {
                            [Op.in]: filesToDelete
                        }
                    },
                    force: true
                });

            }

            return res.redirect(`/blog/${blogId}`)

        } catch (error) {
            console.log(`Falle en blogController.update: ${error}`);
            return res.json(error);
        }
    },
    deleteBlog: async (req, res) => {
        try {
            const blogId = req.params.blogId;
            const blogToDelete = getDeepCopy(await getBlog(blogId))
            // Limpio las imagenes del blog de AWS
            if(blogToDelete.files){
                for (let index = 0; index < blogToDelete.files.length; index++) {
                    const file = blogToDelete.files[index];
                    params = {
                        Bucket: bucketName,
                        Key: `blog/${file.filename}`,
                    };
                    command = new DeleteObjectCommand(params);
                    await s3.send(command);
                }
            }
            await db.Blog.destroy({
                where: {
                    id: blogId
                }
            })
            return res.redirect('/')
        } catch (error) {
            console.log(`Falle en blogController.delete: ${error}`);
            return res.json(error);
        }
    }


}

module.exports = controller