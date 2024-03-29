
const db = require('../database/models');
const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const getCategories = require('../utils/getCategories')
const showdown = require('showdown');
const TurndownService = require('turndown');
const turndownService = new TurndownService();

// Librerias
const { validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
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

// utils
const getRandomItems = require('../utils/getRandomItems');
const getProduct = require('../utils/getProduct');
const getDeepCopy = require('../utils/getDeepCopy');
const getAllProducts = require('../utils/getAllProducts');
const orderMainImageFile = require('../utils/orderMainImageFile');
// const adaptProductsToBeListed = require('../utils/adaptProductsToBeListed');
const productSizes = require('../utils/staticDB/productSizes');
const controller = {
    list: async (req, res) => { //Controlador que renderiza listado de productos
        try {
            let products = getDeepCopy(await getAllProducts());
            products.sort((a, b) => {
                // Si ambos productos tienen stock nulo, no cambia el orden
                if (a.stock === null && b.stock === null) {
                  return 0;
                }
              
                // Si solo el producto "a" tiene stock nulo, se coloca después de "b"
                if (a.stock === null) {
                  return 1;
                }
              
                // Si solo el producto "b" tiene stock nulo, se coloca después de "a"
                if (b.stock === null) {
                  return -1;
                }
              
                // Si ambos productos tienen stock en 0, no cambia el orden
                if (a.stock === 0 && b.stock === 0) {
                  return 0;
                }
              
                // Si solo el producto "a" tiene stock en 0, se coloca después de "b"
                if (a.stock === 0) {
                  return 1;
                }
              
                // Si solo el producto "b" tiene stock en 0, se coloca después de "a"
                if (b.stock === 0) {
                  return -1;
                }
              
                // Ordenar por descuento en caso de que ambos productos tengan stock
                return b.discount - a.discount;
              });
            // Para traer los archivos, primero voy por cada producto y despues a las imagenes de ese producto
            for (let i = 0; i < products.length; i++) {
                const product = products[i];
                if (product.files?.length && product.files) {
                    for (let j = 0; j < product.files.length; j++) {
                        const file = product.files[j];
                        const getObjectParams = {
                            Bucket: bucketName,
                            Key: `product/${file.filename}`
                        }
                        const command = new GetObjectCommand(getObjectParams);
                        const url = await getSignedUrl(s3, command, { expiresIn: 1800 }); //30 min
                        file.file_url = url; //en el href product.files[x].file_url
                        // Si el archivo es main image entonces dejo al producto el main image url para poder acceder
                    }
                    product.files = orderMainImageFile(product.files);
                }
            };
            // return res.send(products);
            let searchQuery = req.query.s;
            let viewLabel;
            // Si viene por busqueda
            if (searchQuery) {
                // Tengo que filtar los productos por el nombre
                products = products.filter(prod => prod.name.toLowerCase().includes(searchQuery.toLowerCase()));
                viewLabel = `"${searchQuery}"`;
            }
            // return res.send(products);
            // Para agarrar las imagenes para galleria
            let productGalleryfiles = getDeepCopy(await db.HomeFile.findAll({
                where: {
                    home_sections_id: 5
                }
            }));
            // Si hay mas de 6 fotos entonces agarro 6 nomas
            let galleryProductLength = 5;
            let galleryProductsForDisplay = [];
            // Dejo la primera siempre igual
            galleryProductsForDisplay.push(productGalleryfiles.find(file => file.position));
            let count = 0;
            while (count < galleryProductLength) { //Dejo 6 productos random
                let random = productGalleryfiles[Math.floor(Math.random() * productGalleryfiles.length)];
                if (!galleryProductsForDisplay.includes(random)) {
                    galleryProductsForDisplay.push(random)
                    count++;
                }
            };
            for (let i = 0; i < galleryProductsForDisplay.length; i++) {
                const file = galleryProductsForDisplay[i];
                const getObjectParams = {
                    Bucket: bucketName,
                    Key: `product/galleryPhoto/${file.filename}`
                }
                const command = new GetObjectCommand(getObjectParams);
                const url = await getSignedUrl(s3, command, { expiresIn: 1800 }); //30 min
                file.file_url = url; //en el href product.files[x].file_url
            };

            // return res.send(productGalleryfiles.find(file=>file.position));
            return res.render('productList', { products, viewLabel, productGalleryfiles: galleryProductsForDisplay })
        } catch (error) {
            console.log(`Falle en productController.list: ${error}`);
            return res.json(error);
        }
    },
    detail: async (req, res) => { //Metodo que muestra detalle de producto
        try {

            const id = req.params.productId
            let product = getDeepCopy(await db.Product.findByPk(id, {
                include: ['files']
            }));
            if (!product) return res.render('error404')
            let suggestedProducts = getDeepCopy(await db.Product.findAll({
                where: {
                    id: { [Op.ne]: id },
                    stock: {
                        [Op.not]: 0
                    }
                },
                include: ['files']
            }));
            suggestedProducts = getRandomItems(suggestedProducts);
            if (product.files) {
                for (let i = 0; i < product.files.length; i++) {
                    const file = product.files[i];
                    const getObjectParams = {
                        Bucket: bucketName,
                        Key: `product/${file.filename}`
                    }
                    const command = new GetObjectCommand(getObjectParams);
                    const url = await getSignedUrl(s3, command, { expiresIn: 1800 }); //30 min
                    file.file_url = url; //en el href product.files[x].file_url
                };
                product.files = orderMainImageFile(product.files);
            };
            // Lo ordeno video ultimo
            product.files.forEach(file => {
                if (file.file_types_id == 2) {
                    const indexToRemove = product.files.indexOf(file);
                    product.files.splice(indexToRemove, 1);//Lo elimino
                    product.files.splice(product.files.length, 0, file); //Lo pongo ultimo
                }
            });
            for (let i = 0; i < suggestedProducts.length; i++) {
                const suggesteProd = suggestedProducts[i];
                if (suggesteProd.files) {
                    for (let j = 0; j < suggesteProd.files.length; j++) {
                        const file = suggesteProd.files[j];
                        const getObjectParams = {
                            Bucket: bucketName,
                            Key: `product/${file.filename}`
                        }
                        const command = new GetObjectCommand(getObjectParams);
                        const url = await getSignedUrl(s3, command, { expiresIn: 1800 }); //30 min
                        file.file_url = url; //en el href product.files[x].file_url
                    }
                    suggesteProd.files = orderMainImageFile(suggesteProd.files)
                }

            }
            // return res.send(product);
            return res.render('productDetail', { product, suggestedProducts })
        } catch (error) {
            console.log(`Falle en productController.detail: ${error}`);
            return res.json(error);
        }
    },
    createProduct: async (req, res) => {
        return res.render('productCreate.ejs', { categories: await getCategories(), productSizes})
    },
    processProductCreation: async (req, res) => {
        try {
            let { name, price, description, ingredients, size, mainImage, stock, discount, sizes_id, weight } = req.body;
            let images = req.files;
            let errors = validationResult(req);
            // Si hay errores..
            if (!errors.isEmpty()) {
                errors = errors.mapped();
                // Si el error es por nombre y/o precio ==> repinto la vista
                if (errors.name || errors.price) {
                    // return res.send({nameEr: errors.name,priceEr: errors.price});
                    return res.redirect(`/product/create`)
                }
                // Sino es un error de tipo de dato ==> tiro bad Request
                return res.send('Bad Request')
            };
            // return res.send(errors);
            // Si el supuesto array de files no es array, retorno error
            if (images) {
                if (!Array.isArray(images)) {
                    return res.send('Bad Request')
                }
            }
            const convertToHtml = () => { // este showdown es para convertir el html a markdown, y conservar el formato
                var converter = new showdown.Converter();
                var htmlText = converter.makeHtml(description);
                return htmlText
            };



            //Probando
            let productObject = {
                id: uuidv4(),
                name,
                price,
                description: convertToHtml(),
                category_id: 1,
                ingredients,
                size,
                stock: parseInt(stock) || 0,
                discount: parseInt(discount) || 0,
                sizes_id: parseInt(sizes_id), 
                weight
            };

            const newProduct = await db.Product.create(productObject);
            if (images) {
                let filesToCreate = [];
                for (let i = 0; i < images.length; i++) {
                    const file = images[i];
                    let fileType = file.mimetype.startsWith('video/') ? 2 : 1;
                    let randomName, buffer;
                    if (fileType == 1) {//FOTO
                        // Creo el nombre unico para la foto (dentro del forEach)
                        randomName = 'product-' + Math.random().toString(36).substring(2, 2 + 10) + '.webp';
                        // Cambio el formato a webp y redimensiono la imagen, total la de los productos 
                        //  no se necesita tan gde      .resize({ height: 1920, width: 1080, fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
                        buffer = await sharp(file.buffer).toFormat('webp').toBuffer();

                    } else {//VIDEO
                        // Creo el nombre unico para el video
                        randomName = 'product-' + Math.random().toString(36).substring(2, 2 + 10) + path.extname(file.originalname);
                        buffer = file.buffer;
                    }
                    // El objeto de la imagen que voy a subir
                    const params = {
                        Bucket: bucketName,
                        Key: `product/${randomName}`,//Esto hace que se guarde en la carpeta product
                        Body: buffer,
                        ContentType: file.mimetype
                    };
                    const command = new PutObjectCommand(params);
                    await s3.send(command);
                    // Armo el objeto para la db
                    filesToCreate.push({
                        filename: randomName,
                        products_id: newProduct.id,
                        file_types_id: fileType,
                        main_image: file.originalname == mainImage ? 1 : 0
                    })
                };
                // Hago el bulkcreate de las imagenes
                await db.ProductFile.bulkCreate(filesToCreate);
            };

            return res.redirect('/product/' + newProduct.id);
        } catch (error) {
            console.log(`Falle en productController.create: ${error}`);
            // images?.forEach(image =>
            //     fs.unlinkSync(path.join(__dirname, `../../public/img/product/${image.image}`)) // DELETE IMGS IN LOCAL FOLDER    
            // );
            return res.json(error);
        }
    },
    updateProduct: async (req, res) => {
        const productId = req.params.productId;
        const product = getDeepCopy(await getProduct(productId));
        const markdown = turndownService.turndown(product.description);
        const productToUpdate = { ...product, description: markdown };
        for (let i = 0; i < productToUpdate.files.length; i++) {
            const file = productToUpdate.files[i];
            const getObjectParams = {
                Bucket: bucketName,
                Key: `product/${file.filename}`
            }
            const command = new GetObjectCommand(getObjectParams);
            const url = await getSignedUrl(s3, command, { expiresIn: 1800 }); //30 min
            file.file_url = url; //en el href product.files[x].file_url
        }
        const categories = await getCategories()
        // return res.send({productToUpdate,productSizes});
        return res.render('productUpdate', { productToUpdate, categories, productSizes })
    },
    processProductUpdate: async (req, res) => {
        try {
            let errors = validationResult(req);
            const productId = req.params.productId;
            const { name, price, description, current_imgs, ingredients, size, mainImage, stock, discount, sizes_id, weight } = req.body
            if (!errors.isEmpty()) {
                errors = errors.mapped();
                // Si el error es por nombre y/o precio ==> repinto la vista
                if (errors.name || errors.price) {
                    return res.redirect(`/product/update/${productId}`)
                }
                return res.send(errors)
                // Sino es un error de tipo de dato ==> tiro bad Request
                return res.send('Bad Request')
            };
            // return res.send(errors);
            // Agarro las imagenes del input
            let files = req.files
            // Si el supuesto array de files no es array, retorno error
            if (files) {
                if (!Array.isArray(files)) {
                    return res.send('Bad Request')
                }
            }
            const productToUpdate = await getProduct(productId)
            // Hago el update del producto en la db
            await db.Product.update({
                name,
                price,
                description,
                ingredients,
                size,
                stock: stock ? parseInt(stock) : 0,
                discount: discount ? parseInt(discount) : 0,
                sizes_id, 
                weight
            }, {
                where: {
                    id: productToUpdate.id
                }
            })

            let filesToUpdateDb = productToUpdate.files.map(file => {
                let isMainImage = file.filename == mainImage ? 1 : 0;
                return {
                    id: file.id,
                    filename: file.filename,
                    products_id: productToUpdate.id,
                    main_image: isMainImage,
                    file_types_id: file.file_types_id
                }
            });

            // Aca voy por cada imagen que llego, y la creo en AWS 
            let filesToCreateDB = [];
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                let fileType = file.mimetype.startsWith('video/') ? 2 : 1;
                let randomName, buffer;
                if (fileType == 1) {//FOTO
                    // Creo el nombre unico para la foto (dentro del forEach)
                    randomName = Math.random().toString(36).substring(2, 2 + 10) + '.webp';
                    // Cambio el formato a webp y redimensiono la imagen, total la de los productos 
                    //  no se necesita tan gde      .resize({ height: 1920, width: 1080, fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
                    buffer = await sharp(file.buffer).toFormat('webp').toBuffer();

                } else {//VIDEO
                    // Creo el nombre unico para el video
                    randomName = Math.random().toString(36).substring(2, 2 + 10) + path.extname(file.originalname);
                    buffer = file.buffer;
                }
                // El objeto de la imagen que voy a subir
                const params = {
                    Bucket: bucketName,
                    Key: `product/${randomName}`,//Esto hace que se guarde en la carpeta product
                    Body: buffer,
                    ContentType: file.mimetype
                };
                const command = new PutObjectCommand(params);
                await s3.send(command);
                // Armo el objeto para la db
                filesToCreateDB.push({
                    filename: randomName,
                    products_id: productToUpdate.id,
                    file_types_id: fileType,
                    main_image: file.originalname == mainImage ? 1 : 0
                })
            };
            let arrayWithFiles = [...filesToUpdateDb, ...filesToCreateDB];

            // Hago el bulkcreate de las imagenes
            await db.ProductFile.bulkCreate(arrayWithFiles, {
                updateOnDuplicate: ["main_image"] // update on duplicate busca por primary key y en caso de encontrar cambia el campo que se le pasa
            });


            // Array con imagenes para borrar
            let filesToDelete = []
            if (!current_imgs) { //Si no vinieron quiere decir que borro todas las que habia
                filesToDelete = [...productToUpdate.files]
            } else {
                productToUpdate.files.forEach(file => { //FILTER TO DELETE IMAGES    

                    if (!current_imgs.includes(file.filename)) {
                        return filesToDelete.push(file)
                    }
                })
            }


            // me fijo si hay imagenes para borrar
            if (filesToDelete.length > 0) {
                for (let i = 0; i < filesToDelete.length; i++) {
                    const file = filesToDelete[i];
                    const params = {
                        Bucket: bucketName,
                        Key: `product/${file.filename}`
                    };
                    const command = new DeleteObjectCommand(params);
                    // Hago el delete de la base de datos
                    await s3.send(command);
                }
            }
            // Aca le dejo solo el filename
            filesToDelete = filesToDelete.map(file => {
                return file.filename
            });

            // DELETE IMGS IN DATABASE     
            await db.ProductFile.destroy({
                where: {
                    filename: {
                        [Op.in]: filesToDelete
                    }
                }
            })


            return res.redirect('/product/' + productId)

        } catch (error) {
            console.log(`Falle en productController.update: ${error}`);
            return res.json(error);
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const productId = req.params.productId;

            const productToDelete = await db.Product.findByPk(productId);
            // Hago el destroy en la tabla productos
            await db.Product.destroy({
                where: {
                    id: productToDelete.id
                }
            });
            // Hago el destroy en la tabla TempItems
            await db.TemporalItem.destroy({
                where: {
                    products_id: productToDelete.id
                }
            });
            return res.redirect('/')
        } catch (error) {
            console.log(`Falle en productController.delete: ${error}`);
            return res.json(error);
        }
    }
};

module.exports = controller;
