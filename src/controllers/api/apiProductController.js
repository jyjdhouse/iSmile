const db = require('../../database/models');
const Sequelize = require('sequelize');

// // From utils
// const getProduct = require('../../utils/getProduct.js');
const getDeepCopy = require('../../utils/getDeepCopy');
const getAllProducts = require('../../utils/getAllProducts');
const getAllTreatments = require('../../utils/getAllTreatments');

const controller = {
    list: async (req, res) => { //Metodo que devuelve todos los productos
        try {
            let products = await getAllProducts();
            return res.status(200).json({
                meta: {
                    status: 200,
                    total: products.length,
                    url: 'api/product'
                },
                count: products.length,
                products
            });
        } catch (error) {
            console.log(`Falle en apiProductController.list: ${error}`);
            return res.json(error);
        }
    },
    detail: async (req, res) => {//Metodo que devuelve producto en especifico
        const { id } = req.params
        let product = await getProduct(id);
        product = getDeepCopy(product);

        return res.status(200).json({
            meta: {
                status: 200,
                url: `api/product/${id}`
            },
            product
        });
    },
    getTreatments: async(req,res) => {//Metodo que devuelve producto en especifico
        let treatments = await getAllTreatments();
        treatments = getDeepCopy(treatments);
       

        return res.status(200).json({
            meta: {
                status: 200,
                url: `api/product/getTreatments`
            },
            treatments
        });
    },
};

module.exports = controller;
