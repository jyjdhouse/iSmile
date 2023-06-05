const fetch = require('node-fetch');
const path = require('path')
const fs = require('fs');
const db = require('../database/models');
// Utils
const getAllProducts = require('../utils/getAllProducts');
const getDeepCopy = require('../utils/getDeepCopy');
const getCategories = require('../utils/getCategories');
const getUpdatedProductTime = require('../utils/getUpdatedProductTime');
const getProduct = require('../utils/getProduct');
const getRelativePath = require('../utils/getRelativePath');
const adaptProductsToBeListed = require('../utils/adaptProductsToBeListed');
const getCountryCodes = require('../utils/getCountryCodes');
const getSizes = require('../utils/getSizes');
const getAllUsers = require('../utils/getAllUsers');

const controller = {
    index: async (req, res) => {
        try {
            // let loginErrors = req.query.loginErrors && JSON.parse(req.query.loginErrors);
            // let oldData = req.query.oldData && JSON.parse(req.query.oldData);
            // let productsForGallery = [];
            // let count = 0;
            // while (count < 6) { //Dejo 6 productos random
            //     let random = products[Math.floor(Math.random() * products.length)];
            //     if (!productsForGallery.includes(random)) {
            //         productsForGallery.push(random)
            //         count++;
            //     }
            // };
            return res.render('index')
            // Esto es para que me muestre solo una variedad de color
            productsForGallery.forEach(prod => {
                // Esto es para mostrar 'disponible tambien en...'
                prod.otherColors = [];
                // Voy por cada color
                prod.colors.forEach((col, i) => {
                    // si es distinto a 0 es que hay mas colores
                    if (i != 0) {
                        // Busco el primero de ese color y que sea foto
                        let filename = prod.files.find(file => {
                            return file.colors_id == col.id && file.file_types_id == 1
                        })
                        filename = filename?.filename;
                        prod.otherColors.push({
                            id: col.id,
                            filename
                        });
                    }
                });
                // Esto es para que me muestre las fotos del primer color
                prod.files = prod.files?.filter(file => {
                    return file.colors_id == prod.colors[0].id && file.file_types_id == 1
                });
            });

            // return res.send(productsForGallery);
            // Si me llegan errores, renderizo la vista y le llevo los params errores
            if (loginErrors) {
                // return res.send(req.query.loginErrors)
                return res.render('index', { loginErrors, oldData, categories: await getCategories(), productsForGallery, countryCodes: await getCountryCodes() });
            };
            
            return res.render('index', { categories: await getCategories(), productsForGallery, countryCodes: await getCountryCodes() })
        } catch (error) {
            console.log(`Falle en mainController.list: ${error}`);
            return res.send(error);
        }
    },
    services: async(req,res)=>{
        try {
            return res.render('services')
        } catch (error) {
            console.log(`Falle en mainController.services: ${error}`);
            return res.json({error})
        }
    }
};

module.exports = controller;