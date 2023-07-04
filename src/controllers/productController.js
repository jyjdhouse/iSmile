
const db = require('../database/models');
const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const getCategories = require('../utils/getCategories')

// utils

const getProduct = require('../utils/getProduct');
// const adaptProductsToBeListed = require('../utils/adaptProductsToBeListed');
// const getCountryCodes = require('../utils/getCountryCodes');

const controller = {
    list: async (req, res) => { //Controlador que renderiza listado de productos
        try {
            let products = await db.Product.findAll({
                include: ['files']
            });
            // return res.send(products);
            return res.render('productList',{products})
        } catch (error) {
            console.log(`Falle en productController.list: ${error}`);
            return res.json(error);
        }
    },
    detail: async (req, res) => { //Metodo que muestra detalle de producto
        try {
            
            const id = req.params.productId
            let product = await db.Product.findByPk(id,{
                include: ['files']
            });
            // return res.send(product);
            return res.render('productDetail', {product})
        } catch (error) {
            console.log(`Falle en productController.detail: ${error}`);
            return res.json(error);
        }
    },
    createProduct: async (req, res) => {
        return res.render('productCreate.ejs', { categories: await getCategories() })
    },
    processProductCreation: async (req, res) => {
        try {

            let { name, price, description, category } = req.body;
            let images = req.files;
           

            let productObject = {
                name,
                price,
                description,
                category_id: category
            };

            const newProduct = await db.Product.create(productObject);

            let imagesObject = images.map(obj => {
                const fileType = obj.mimetype.startsWith('video/') ? 2 : 1;
                return {
                    image: obj.filename,
                    product_id: newProduct.id,
                    file_types_id: fileType
                }
            });
            await db.Product_Image.bulkCreate(imagesObject);


            return res.redirect('/')
        } catch (error) {
            console.log(`Falle en productController.create: ${error}`);
            images.forEach(image =>
                fs.unlinkSync(path.join(__dirname, `../../public/img/product/${image.filename}` )) // DELETE IMGS IN LOCAL FOLDER    
            );
            return res.json(error);
        }
    },
    updateProduct: async (req, res) => {
        const productId = req.params.productId;
        const productToUpdate = await db.Product.findByPk(productId, { include: ['category', 'images'] })
        const categories = await getCategories()
       
        return res.render('productUpdate.ejs', {productToUpdate, categories})
    },
    processProductUpdate: async (req, res) => {
        try {

            const productId = req.params.productId;
            const productToUpdate = await db.Product.findByPk(productId, { include: ['category', 'images'] })
            const { name, price, description } = req.body
            let images = req.files

            const productUpdated = await db.Product.update({
                name,
                price,
                description
            }, {
                where: {
                    id: productToUpdate.id
                }
            })

            let imagesObject = images.map(obj => {
                return {
                    image: obj.filename,
                    product_id: productUpdated.id
                }
            });
            await db.Product_Image.bulkCreate(imagesObject);

            let imgsToDelete = []

            const imgsToDeleteFilter = productToUpdate.images.filter(image => { //FILTER TO DELETE IMAGES 
                
                if (!req.body.current_imgs.includes(image.image)) {
                    return imgsToDelete.push(image.image)
                }
            })


            if (imgsToDelete.length > 0) {
                
                imgsToDelete.forEach(image =>
                   
                    fs.unlinkSync(path.join(__dirname, `../../public/img/product/${image}`)) // DELETE IMGS IN LOCAL FOLDER    
                );


                await db.Product_Image.destroy({
                    where: {
                        image: {
                            [Op.in]: imgsToDelete
                        }
                    }
                }) // DELETE IMGS IN DATABASE     

            }


            return res.redirect('/')

        } catch (error) {
            console.log(`Falle en productController.update: ${error}`);
            return res.json(error);
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const productId = req.params.productId;

            const productToDelete = await db.Product.findByPk(productId);

            await db.Product.destroy({
                where: {
                    id: productToDelete.id
                }
            })
            return res.redirect('/')
        } catch (error) {
            console.log(`Falle en productController.delete: ${error}`);
            return res.json(error);
        }
    }
    // searchResult: async(req,res) =>{
    //     let productsId = Array.from(JSON.parse(req.body.ids));
    //     // return console.log(productsId)
    //     let searchProducts = []; //Array de productos
    //     const searchTitle = req.body.search; //Titulo de la busqueda
    //     for (let i = 0; i < productsId.length; i++) {
    //         const id = productsId[i];
    //         const product = await getProduct(id);
    //         searchProducts.push(product)
    //     }
    //     let products = adaptProductsToBeListed(searchProducts);
    //     // return res.send(products);
    //     return res.render('productListTest',{searchTitle, products, categories: await getCategories(), countryCodes: await getCountryCodes()})
    // }
};

module.exports = controller;
