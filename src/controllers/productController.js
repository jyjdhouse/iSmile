
const db = require('../database/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// utils


const controller = {
    list: async (req, res) => { //Controlador que renderiza listado de productos
        try {
            let errors = req.query.errors && JSON.parse(req.query.errors);
            let oldData = req.query.oldData && JSON.parse(req.query.oldData);
            // Si me llegan errores, renderizo la vista y le llevo los params errores
            return res.render('productList')
            if (errors) {
                // return res.send(req.query.errors)
                return res.render('productList', { errors, oldData, categories: await getCategories(), countryCodes: await getCountryCodes() });
            }
        } catch (error) {
            console.log(`Falle en productController.list: ${error}`);
            return res.json(error);
        }
    },
    getOneProduct: async(req,res) =>{
        let product = await db.Product.findAll({
            where:{
                id: 8
            },
            include: ['keywords','colors']
        });
        return res.send(product)
    },
    detail: async (req, res) => { //Metodo que muestra detalle de producto
        try {
            return res.render('productDetail')
            let errors = req.query.errors && JSON.parse(req.query.errors);
            let oldData = req.query.oldData && JSON.parse(req.query.oldData);
            // Si me llegan errores, renderizo la vista y le llevo los params errores
            if (errors) {
                // return res.send(req.query.errors)
                return res.render('productDetail', { errors, oldData, categories: await getCategories(), countryCodes: await getCountryCodes(), countryCodes: await getCountryCodes() });
            }
        } catch (error) {
            console.log(`Falle en productController.detail: ${error}`);
            return res.json(error);
        }
    },
    searchResult: async(req,res) =>{
        let productsId = Array.from(JSON.parse(req.body.ids));
        // return console.log(productsId)
        let searchProducts = []; //Array de productos
        const searchTitle = req.body.search; //Titulo de la busqueda
        for (let i = 0; i < productsId.length; i++) {
            const id = productsId[i];
            const product = await getProduct(id);
            searchProducts.push(product)
        }
        let products = adaptProductsToBeListed(searchProducts);
        // return res.send(products);
        return res.render('productListTest',{searchTitle, products, categories: await getCategories(), countryCodes: await getCountryCodes()})
    }
};

module.exports = controller;
