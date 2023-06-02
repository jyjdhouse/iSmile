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
            let loginErrors = req.query.loginErrors && JSON.parse(req.query.loginErrors);
            let oldData = req.query.oldData && JSON.parse(req.query.oldData);
            let products = await getAllProducts();
            products = getDeepCopy(products);
            let productsForGallery = [];
            let count = 0;
            while (count < 6) { //Dejo 6 productos random
                let random = products[Math.floor(Math.random() * products.length)];
                if (!productsForGallery.includes(random)) {
                    productsForGallery.push(random)
                    count++;
                }
            };
            // return res.send(await getAllUsers())
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
    productList: async (req, res) => {
        try {
            let { id } = req.params;
            let loginErrors = req.query.loginErrors && JSON.parse(req.query.loginErrors);
            let oldData = req.query.oldData && JSON.parse(req.query.oldData);
            let searchTitle;
            let categories = await getCategories()
            let products = await getAllProducts();
            products = adaptProductsToBeListed(products);
            // Si me llegan errores, renderizo la vista y le llevo los params errores
            if (loginErrors) {
                // return res.send(req.query.loginErrors)
                return res.render('productListTest', { loginErrors, oldData, products, searchTitle, categories, countryCodes: await getCountryCodes() });
            };

            // return res.send(products);
            if (id) {//Si vino un id, quiere decir que pinto una categoria en especifico
                // Filtro productos por esa categoria
                products = products.filter(prod => prod.categories_id == id);
                searchTitle = categories.find(cat => cat.id == id).name
                searchTitle = `${searchTitle}s`
                return res.render('productListTest', { products, searchTitle, categories })
            }
            // si no entra es que tocaron "Ver todo"
            searchTitle = 'Todos los productos'
            return res.render('productListTest', { products, searchTitle, categories, countryCodes: await getCountryCodes() })
        } catch (error) {
            console.log(`Falle en mainController.productList: ${error}`);
            return res.json({ error })
        }
    },
    productDetail: async (req, res) => {
        try {

            let errors = req.query.errors && JSON.parse(req.query.errors);
            let oldData = req.query.oldData && JSON.parse(req.query.oldData);

            const { colorId, prodId } = req.params
            let product = await getProduct(prodId);
            product = getDeepCopy(product);

            let allProducts = await getAllProducts();
            allProducts = getDeepCopy(allProducts);
            // La categoria del producto, para relatedProducts
            let productCategoryId = product['categories_id'];

            // Si el color no pertenece al producto, lo redirijo a la vista de antes
            if (!product?.colors.find(col => col.id == colorId)) {
                return res.redirect(getRelativePath(req.headers.referer))
            };
            // Imagenes/Videos de ese color
            let files = product.files.filter(file => file.colors_id == colorId);
            // Lo ordeno video ultimo
            files.forEach(file => {
                if (file.file_types_id == 2) {
                    const indexToRemove = files.indexOf(file);
                    files.splice(indexToRemove, 1);//Lo elimino
                    files.splice(files.length, 0, file); //Lo pongo ultimo
                }
            });
            // Imagenes de otros colores
            let usedColors = [];
            let otherColorsImages = [];
            // Voy por cada archivo, pusheo el primero de cada color
            product.files.forEach(file => {
                // Si no se uso el color y es foto
                if (!usedColors.includes(file.colors_id) && file.file_types_id == 1) {
                    usedColors.push(file.colors_id);
                    otherColorsImages.push(file)
                }
            });

            // STOCK de ese color
            product.stocks = product.stocks.filter(stock=>stock.colors_id == colorId);
            
            // Agarro la fecha de modificacion del producto asi muestro hace cuanto fue
            product.updatedAt = getUpdatedProductTime(product.updatedAt);

            /* OUTFITS PRODUCTS */

            // Filtro los outfitProducts por la combinacion del color que renderizo
            product.outfitProducts = await db.OutfitProduct.findAll({
                where: {
                    products_id: prodId,
                    colors_id: colorId
                }
            });
            //return res.send(product);
            // Rearmo product.outfitProducts para que sea como un producto normal
            product.outfitProducts = product.outfitProducts.map(outfitProd=>{
                const newProd =  allProducts.find(prod=> prod.id == outfitProd.outfit_product_id);
                return {
                    ...newProd,
                    // Aca defino la propiedad del id del color
                    colorId : outfitProd["outfit_color_id"]
                }
            });
            // return res.send(product)
            // console.log(product);

            // Voy por cada outfotProd
            for (let i = 0; i < product.outfitProducts.length; i++) {
                const outfitProd = product.outfitProducts[i];
                // Aca defino la propiedad de las fotos de ese producto
                outfitProd.files = outfitProd.files.filter(file => file.colors_id == outfitProd.colorId)

                // Ordeno el array de files para que el video se muestre 2do
                // Lo ordeno
                outfitProd.files?.forEach(file => {
                    if (file.file_types_id == 2) {
                        const indexToRemove = outfitProd.files.indexOf(file);
                        outfitProd.files.splice(indexToRemove, 1);//Lo elimino
                        outfitProd.files.splice(1, 0, file); //Lo pongo 2do
                    }
                });
                
                //Aca defino la propiedad si es wishedProduct
                outfitProd.wishedUsers = outfitProd.wishedUsers;
            };
            
            // RELATED PRODUCTS
            product.relatedProducts = allProducts.filter(prod => prod.id != product.id && prod.categories_id == productCategoryId);
           
            // Voy por cada related, y le dejo solo un color de foto
            product.relatedProducts.forEach((relatedProd, i) => {
                let colorId = relatedProd.colors[0].id;
                // Agarro solo los de ese color
                product.relatedProducts[i].files = relatedProd.files.filter(file => file.colors_id == colorId);
                // Ordeno el array para que sea primero foto despues video despues foto
                product.relatedProducts[i].files.forEach(file => {
                    if (file.file_types_id == 2) {
                        const indexToRemove = product.relatedProducts[i].files.indexOf(file);
                        product.relatedProducts[i].files.splice(indexToRemove, 1);//Lo elimino
                        product.relatedProducts[i].files.splice(1, 0, file); //Lo pongo 2do
                    }
                })

            });

            // return res.send(product);
            // return res.send(files)


            // Si me llegan errores, renderizo la vista y le llevo los params errores
            if (errors) {
                // return res.send(req.query.errors)
                return res.render('productDetailTest', { errors, product, files, otherColorsImages, categories: await getCategories(), countryCodes: await getCountryCodes(), sizes: await getSizes() });
            }

            return res.render('productDetailTest', { product, files, otherColorsImages, categories: await getCategories(), countryCodes: await getCountryCodes(), sizes: await getSizes() })
        } catch (error) {
            console.log(`Falle en mainController.productDetail: ${error}`);
            return res.json({ error })
        }
    }
};

module.exports = controller;