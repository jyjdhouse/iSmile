
const db = require('../database/models');
const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const getCategories = require('../utils/getCategories')

// Librerias
const { v4: uuidv4 } = require('uuid');
// utils
const getRandomItems = require('../utils/getRandomItems');
const getProduct = require('../utils/getProduct');
const getDeepCopy = require('../utils/getDeepCopy');
const getAllProducts = require('../utils/getAllProducts');
// const adaptProductsToBeListed = require('../utils/adaptProductsToBeListed');
// const getCountryCodes = require('../utils/getCountryCodes');

const controller = {
    list: async (req, res) => { //Controlador que renderiza listado de productos
        try {
            let products = getDeepCopy(await getAllProducts());
            let searchQuery = req.query.s;
            let viewLabel;
            // Si viene por busqueda
            if(searchQuery){
                // Tengo que filtar los productos por el nombre
                products = products.filter(prod=>prod.name.toLowerCase().includes(searchQuery.toLowerCase()));
                viewLabel = `"${searchQuery}"`;
            } 
            // return res.send(products);
            return res.render('productList', { products, viewLabel })
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
            let suggestedProducts = getDeepCopy(await db.Product.findAll({
                where: {
                    id: { [Op.ne]: id }
                },
                include: ['files']
            }));
            suggestedProducts = getRandomItems(suggestedProducts);
            // return res.send(suggestedProducts);
            return res.render('productDetail', { product, suggestedProducts })
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
                id: uuidv4() ,
                name,
                price,
                description,
                category_id: category
            };

            const newProduct = await db.Product.create(productObject);

            const imagesObject = images.map(obj => {
                let fileType = obj.mimetype.startsWith('video/') ? 2 : 1;
                return {
                    filename: obj.filename,
                    products_id: newProduct.id,
                    file_types_id: fileType
                }
            });
            await db.ProductFile.bulkCreate(imagesObject);


            return res.redirect('/product/'+newProduct.id);
            
        } catch (error) {
            console.log(`Falle en productController.create: ${error}`);
            images.forEach(image =>
                fs.unlinkSync(path.join(__dirname, `../../public/img/product/${image.image}`)) // DELETE IMGS IN LOCAL FOLDER    
            );
            return res.json(error);
        }
    },
    updateProduct: async (req, res) => {
        const productId = req.params.productId;
        const productToUpdate = await getProduct(productId)
        const categories = await getCategories()

        return res.render('productUpdate', { productToUpdate, categories })
    },
    processProductUpdate: async (req, res) => {
        try {

            const productId = req.params.productId;
            const productToUpdate = await getProduct(productId)
            const { name, price, description, current_imgs } = req.body
           
            // Agarro las imagenes del input
            let images = req.files
            // Hago el update del producto en la db
            const productUpdated = await db.Product.update({
                name,
                price,
                description
            }, {
                where: {
                    id: productToUpdate.id
                }
            })
            // return res.send(productUpdated);

            let imagesObjectDB = images.map(obj => {
                let fileType = obj.mimetype.startsWith('video/') ? 2 : 1;
                return {
                    filename: obj.filename,
                    products_id: productId,
                    file_types_id: fileType
                }
            });
            await db.ProductFile.bulkCreate(imagesObjectDB);

            // Array con imagenes para borrar
            let imgsToDelete = []

            productToUpdate.files.forEach(file => { //FILTER TO DELETE IMAGES                 
                if (!current_imgs.includes(file.filename)) {
                    return imgsToDelete.push(file.filename)
                }
            })

            // me fijo si hay imagenes para borrar
            if (imgsToDelete.length > 0) {
                imgsToDelete.forEach(filename =>
                    // DELETE IMGS IN LOCAL FOLDER    
                    fs.unlinkSync(path.join(__dirname, `../../public/img/product/${filename}`)) 
                );
                // DELETE IMGS IN DATABASE     
                await db.ProductFile.destroy({
                    where: {
                        filename: {
                            [Op.in]: imgsToDelete
                        }
                    }
                })
            };

            return res.redirect('/product/'+productId)

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
