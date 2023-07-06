const db = require('../database/models/');
const getBlog = require('../utils/getBlog')
const fs = require('fs')
const path = require('path')
const showdown = require('showdown');
const TurndownService = require('turndown');
const turndownService = new TurndownService();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;



const controller = {
    list: async (req, res) => { //Metodo que devuelve todos los blogs
        try {
            let blogs = await db.Blog.findAll()
            return res.render('blogList', { blogs })
        } catch (error) {
            console.log(`Falle en blogController.list: ${error}`);
            return res.json(error);
        }
    },
    detail: async (req, res) => {//Metodo que devuelve blog en especifico
        try {
            const { blogId } = req.params
            let blog = await getBlog(blogId);

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
            const images = req.files;
            mainImage = images.find(img => img.originalname == mainImage)


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


            let imagesObjectDB = images.map(img => {
                let isMainImage = img == mainImage ? 1 : 0;
                return {
                    filename: img.filename,
                    blog_id: newBlog.id,
                    main_image: isMainImage,
                }
            });

            await db.BlogImage.bulkCreate(imagesObjectDB);
            return res.redirect(`blog/${newBlog.id}`)
        } catch (error) {
            console.log(`Falle en blogController.creado: ${error}`);
            return res.json(error);
        }
    },
    update: async (req, res) => {
        const blogId = req.params.blogId
        const blog = await getBlog(blogId)
        const markdown = turndownService.turndown(blog.text)
        const blogToUpdate = { ...blog, text: markdown }
        return res.render('updateBlog', { blogToUpdate })
    },
    processBlogUpdate: async (req, res) => {
        try {

            const blogId = req.params.blogId;
            const blogToUpdate = await db.Blog.findByPk(blogId, { include: ['images'] });
            const images = req.files;
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

            let imagesObjectToUpdate = blogToUpdate.images.map(img => {
                let isMainImage = img.filename == mainImage ? 1 : 0;
                return {
                    id: img.id,
                    filename: img.filename,
                    blog_id: blogToUpdate.id,
                    main_image: isMainImage,
                }
            });
           

            let imagesObjectToCreate = images.map(img => {
                let isMainImage = img == mainImage ? 1 : 0;
                return {
                    filename: img.filename,
                    blog_id: blogToUpdate.id,
                    main_image: isMainImage,
                }
            });

            let arrayWithImages = [...imagesObjectToUpdate, ...imagesObjectToCreate]
            
            await db.BlogImage.bulkCreate(arrayWithImages, {
                updateOnDuplicate: ["main_image"] // update on duplicate busca por primary key y en caso de encontrar cambia el campo que se le pasa
            });

            let imgsToDelete = [];

            const imgsToDeleteFilter = blogToUpdate.images.filter(image => { //FILTER TO DELETE IMAGES 
                if (!current_imgs.includes(image.dataValues.filename)) {
                    return imgsToDelete.push(image.dataValues.filename)
                }
            });

            if (imgsToDeleteFilter.length > 0) {

                imgsToDelete.forEach(image => {

                    fs.unlinkSync(path.join(__dirname, '../../public/img/blog/' + image))
                }
                    // DELETE IMGS IN LOCAL FOLDER    
                );

                await db.BlogImage.destroy({
                    where: {
                        filename: {
                            [Op.in]: imgsToDelete
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

    deleteProduct: async (req, res) => {
        try {
            const blogId = req.params.blogId;

            const blog = await getBlog(blogId);

            await db.Blog.destroy({
                where: {
                    id: blog.id
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