
const db = require('../database/models');
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
        return res.render('productCreate.ejs',{ categories: await getCategories()})
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
                return {
                    image: obj.filename,
                    product_id: newProduct.id
                }
            });
            await db.Product_Image.bulkCreate(imagesObject);


            return res.redirect('/')
        } catch (error) {
            console.log(`Falle en productController.create: ${error}`);
            images.forEach(image =>
                fs.unlinkSync(path.join(__dirname, '../../public/img/product' + image.filename)) // DELETE IMGS IN LOCAL FOLDER    
            );
            return res.json(error);
        }
    },
    processProductUpdate: async (req, res) => {
        try {
         
            const productId = req.params.productId;
            const productToUpdate = await db.Device.findByPk(productId, { include: ['category'] })
            const {name, price, description} = req.body

            const productUpdated = await db.Device.update({
                name,
                price,
                description
            }, {
                where: {
                    id: productToUpdate.id
                }
            })


            return res.status(200).json({
                meta: {
                    status: 200,
                    msg: 'Producto actualizado Correctamente!'
                },
                product: productUpdated
            });

        } catch (error) {
            console.log(`Falle en productController.update: ${error}`);
            return res.json(error);
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const productId = req.params.productId;

             const accessoryToDelete = await db.Product.findByPk(productId);
 
             await db.Accessory.destroy({
                 where: {
                     id: accessoryToDelete.id
                 }
             }) 
             return res.status(200).json({
                meta: {
                    status: 200,
                    msg: 'Producto eliminado satisfactoriamente'
                },
                id: productId
            });
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
