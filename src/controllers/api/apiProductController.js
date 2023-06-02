const path = require('path');
const fs = require('fs');
const db = require('../../database/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// From utils
const getFiles = require('../../utils/getFiles.js');
const getProduct = require('../../utils/getProduct.js');
const getKeywords = require('../../utils/getKeywords.js');
const firstCapitalLetter = require('../../utils/firstCapitalLetter.js');
const getDeepCopy = require('../../utils/getDeepCopy');
const getAllProducts = require('../../utils/getAllProducts');

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
        // Armo el objeto outfitProd que ya viene
        product.outfitProductsObject = {};

        let outfitProducts = await db.OutfitProduct.findAll({
            where: {
                products_id: id
            }
        });
        outfitProducts.forEach(combination => {
            const colorId = combination.colors_id;
            if (!product.outfitProductsObject[colorId]) {
                product.outfitProductsObject[colorId] = [];
            }
            product.outfitProductsObject[colorId].push({
                prodId: combination.outfit_product_id,
                colorId: combination.outfit_color_id
            })
        });

        return res.status(200).json({
            meta: {
                status: 200,
                url: `api/product/${id}`
            },
            product
        });
    },
    getColors: async (req, res) => {//Metodo que devuelve todos los colores
        let colors = await db.Color.findAll();
        return res.status(200).json({
            meta: {
                status: 200,
                total: colors.length,
                url: 'api/product/color'
            },
            count: colors.length,
            colors
        });
    },
    addWishlistProduct: async (req, res) => {
        try {
            const { productId, userId, colorId } = req.body;
            console.log('ESTOY ACA:' + productId);
            await db.Wishlist.create({
                products_id: productId,
                users_id: userId,
                colors_id: colorId,
                createdAt: Date.now()
            });

            // Anulo el period time para que arranque devuelta el mail
            await db.User.update({
                wishlist_period_type: null
            }, {
                where: {
                    id: userId
                }
            })
            return res.status(200).json({
                meta: {
                    status: 200,
                    msg: 'Producto agregado a la Wishlist'
                }
            });
        } catch (error) {
            console.log(`Falle en productController.addWhishlistProduct: ${error}`);
            return res.json(error);
        }
    },
    removeWishlistProduct: async (req, res) => {
        try {
            const { productId, userId, colorId } = req.body;
            await db.Wishlist.destroy({
                where: {
                    products_id: productId,
                    users_id: userId,
                    colors_id: colorId,
                }
            });
            // Anulo el period time para que arranque devuelta el mail
            await db.User.update({
                wishlist_period_type: null
            }, {
                where: {
                    id: userId
                }
            })
            return res.status(200).json({
                meta: {
                    status: 200,
                    msg: 'Producto eliminado de la Wishlist'
                }
            });
        } catch (error) {
            console.log(`Falle en productController.removeWhishlistProduct: ${error}`);
            return res.json(error);
        }
    },
    create: async (req, res) => {//Esto va a API porque es un pedido por front
        try {
            // Agarro el body de la vista CreateProduct
            let { name, price, description, colors, keywords, details, categories_id, outfitProducts, stocks } = req.body;
            colors = JSON.parse(colors);
            keywords = JSON.parse(keywords);
            details = JSON.parse(details);
            stocks = JSON.parse(stocks);
            outfitProducts = JSON.parse(outfitProducts);

            console.log(outfitProducts);
            // return res.status(200).json({
            //     meta: {
            //         status: 200,
            //         msg: 'Producto Creado Correctamente!'
            //     },
            //     product: outfitProducts,
            // });

            // Armo los campos para crear el producto
            let productToCreate = {
                name,
                price,
                description,
                categories_id
            };
            // Creo el producto primero que nada
            let productCreated = await db.Product.create(productToCreate);

            // LOGICA para crear los files del producto
            //Agarro los archivos - [{},{}]. Propiedad fieldname ==> colorId
            files = req.files;
            if (files) {
                // Creo array para bulkCreate
                let filesToCreate = [];
                files.forEach(file => { //Voy por cada imagen, asi armo el array
                    // Capturo nombre y filename
                    const colorId = parseInt(file.fieldname);
                    const filename = file.filename
                    // Chequeo si es foto o video
                    const fileType = file.mimetype.startsWith('video/') ? 2 : 1;
                    filesToCreate.push({//Estos van despues de que se crea el producto
                        filename,
                        file_types_id: fileType,
                        colors_id: colorId,
                        products_id: productCreated.id
                    })
                });
                // Hago el bulkcreate con todos los files ya armados
                await db.File.bulkCreate(filesToCreate);
            }

            // LOGICA para agregar los colores al producto
            let colorsToPush = [];
            colors.forEach(color => {
                console.log(color);
                colorsToPush.push({
                    colors_id: parseInt(color),
                    products_id: productCreated.id
                })
            });
            await db.Product_Color.bulkCreate(colorsToPush);


            // LOGICA para crear las keywords que no existen & crear la tabla pivot
            await keywords.forEach(async (key) => { //Voy por cada keyword
                key = key.toLowerCase();
                // Si me da un valor, tomo el id y creo en la tabla pivot con el productId
                let existingKey = await db.Keyword.findOne({
                    where: {
                        name: key
                    }
                });
                if (existingKey) { //Si encontro esa key
                    await db.Keyword_Product.create({ //Creo la relacion entre keyword y producto
                        keywords_id: existingKey.id,
                        products_id: productCreated.id
                    });
                } else { //Si no existe
                    let newKeyword = await db.Keyword.create({
                        name: key
                    }); //Creo la keyword
                    await db.Keyword_Product.create({ //Creo la relacion entre keyword y producto
                        keywords_id: newKeyword.id,
                        products_id: productCreated.id
                    });
                };
            });

            // LOGICA para crear los details 
            await details.forEach(async (detail) => { //Voy por cada detail
                // Formateo para primer letra en mayuscula
                detail = firstCapitalLetter(detail)


                await db.ProductDetail.create({ //Creo la detail enla tabla
                    detail,
                    products_id: productCreated.id
                });

            });

            // LOGICA para crear outfitProducts
            let arrayToCreate = [];
            // Voy por cada color que se relaciono algun producto
            for (let outfitColorId in outfitProducts) {
                //Aca entro al array del color que se eligio outfits
                let combinationsArray = outfitProducts[outfitColorId];
                for (let i = 0; i < combinationsArray.length; i++) {
                    const combination = combinationsArray[i];
                    arrayToCreate.push({
                        products_id: productCreated.id,
                        colors_id: outfitColorId,
                        outfit_product_id: combination.prodId,
                        outfit_color_id: combination.colorId
                    });
                };
            };
            console.log(arrayToCreate);
            await db.OutfitProduct.bulkCreate(arrayToCreate)

            // LOGICA para stock
            stocks = stocks.map(s => {
                return {
                    products_id: productCreated.id,
                    colors_id: parseInt(s.colorID),
                    sizes_id: parseInt(s.sizeId),
                    quantity: s.quantity || 0
                }
            });
            await db.Stock.bulkCreate(stocks);

            return res.status(200).json({
                meta: {
                    status: 200,
                    msg: 'Producto Creado Correctamente!'
                },
                product: productCreated,
            });
        } catch (error) {
            console.log(`Falle en productController.create: ${error}`);
            return res.json(error);
        }
    },
    update: async (req, res) => {
        try {
            const updateKeywords = async () => {//Creo y Borro la relacion de keywords
                // Agarro las keywords, con su relacion
                let dbKeywords = await getKeywords();

                //El array keywords es ['#key1','#key2','#key3'] con las key del producto actualizados
                // Voy por cada key, si el producto no lo tiene lo agrego como relacion
                keywords.forEach(async (key) => {
                    // Me fijo si la key existe en el producto
                    const existingProductKey = product.keywords.find(dbProductKey => dbProductKey.name == key);
                    if (!existingProductKey) { //Si el producto no tiene la key relacionado...
                        // Me fijo si la key existe en la db
                        const existingDBKey = dbKeywords.find(dbKey => dbKey.name == key);
                        if (!existingDBKey) { //Si no existe...
                            // Primero la creo, luego su relacion
                            let newKey = await db.Keyword.create({
                                name: key
                            });
                            await db.Keyword_Product.create({
                                keywords_id: newKey.id,
                                products_id: prodId
                            });
                        } else { //Si existe creo la relacion
                            await db.Keyword_Product.create({
                                keywords_id: existingDBKey.id,
                                products_id: prodId
                            })
                        }
                    };
                });
                // Pregunto si cada key de la relacion esta en el array del body
                product.keywords.forEach(async (key) => {
                    if (!keywords.includes(key.name)) {//Si no esta incluido...
                        await db.Keyword_Product.destroy({
                            where: {
                                keywords_id: key.id,
                                products_id: prodId
                            }
                        });
                    };
                });
            };

            const deleteFiles = async (colorId) => {//Borra de la db todos los archivos de este colorId
                try {
                    // Primero las borro de la app
                    product.files.forEach(file => {
                        // Solo agarro las files que sean de ese color
                        if (file.color.id == colorId) {
                            const filename = file.filename;
                            if (file.file_types_id == 1) {//foto
                                // Primero le pregunto si existe
                                if (fs.existsSync(path.join(__dirname, '../../../public/img/' + filename))) {
                                    fs.unlinkSync(path.join(__dirname, '../../../public/img/' + filename));
                                }
                            } else if (file.file_types_id == 2) {//video
                                // Primero le pregunto si existe
                                if (fs.existsSync(path.join(__dirname, '../../../public/video/' + filename))) {
                                    fs.unlinkSync(path.join(__dirname, '../../../public/video/' + filename));
                                }
                            }
                        }
                    });
                    // Luego las borro de la db
                    await db.File.destroy({
                        where: {
                            colors_id: colorId,
                            products_id: prodId
                        }
                    });
                } catch (error) {
                    return console.log(`Falle en deleteFiles :${error}`)
                }
            };

            const updateDetails = async () => {
                //Voy por cada detail, pregunto si esta en db y si no esta lo agrego
                details.forEach(async (detail) => {
                    const existingDetail = await db.ProductDetail.findOne({
                        where: {
                            detail,
                            products_id: prodId
                        }
                    });
                    if (!existingDetail) { //Si no existe...
                        await db.ProductDetail.create({
                            detail,
                            products_id: prodId
                        })
                    }
                });
                // Voy por cada detail del producto antes de modificarse, pregunto por cada key
                // si no esta, lo borro
                product.details.forEach(async (det) => {
                    if (!details.includes(det.detail)) {//Si este detalle no esta en el body...
                        await db.ProductDetail.destroy({
                            where: {
                                id: det.id
                            }
                        })
                    }
                })
            };

            const updateColors = async () => {
                try {

                    //El array colors es ['1','4','12'] con los colores del producto actualizados
                    // Voy por cada uno, si el producto no lo tiene lo agrego como relacion
                    colors.forEach(async (color) => {
                        const existingColor = product.colors.find(col => col.id == color);
                        if (!existingColor) { //Si el producto no tiene el color relacionado...
                            await db.Product_Color.create({
                                colors_id: color,
                                products_id: prodId
                            });
                        };
                    });
                    // Pregunto si cada color de la relacion esta en el array del body
                    product.colors.forEach(async (color) => {
                        if (!colors.includes(color.id)) {//Si no esta incluido...
                            await db.Product_Color.destroy({
                                where: {
                                    colors_id: color.id,
                                    products_id: prodId
                                }
                            });
                            // Borro todos los archivos relacionados a ese color tambien
                            const dbFiles = await getFiles();
                            // Hago un filter para ver si con ese color y producto hay alguna foto/video
                            const existingColorFiles = dbFiles.filter(file => {
                                return file.colors_id == color.id && file.products_id == prodId
                            });
                            if (existingColorFiles.length) {//Si hay archivos para eliminar...
                                console.log("HAY ARCHIVOS QUE ELIMINAR");
                                existingColorFiles.forEach(async (file) => {
                                    // Lo borro de la db
                                    await db.File.destroy({
                                        where: {
                                            id: file.id
                                        }
                                    });
                                    // Lo borro de la app
                                    if (file.file_types_id == 1) {//Si es foto...
                                        fs.unlinkSync(path.join(__dirname, '../../../public/img/' + file.filename));
                                    } else if (file.file_types_id == 2) { //Si es video...
                                        fs.unlinkSync(path.join(__dirname, '../../../public/video/' + file.filename));
                                    }
                                });
                            };
                        };
                    });
                } catch (error) {
                    return console.log(`Falle en updateColors :${error}`)
                }
            }

            const updateOutfitProducts = async () => {
                outfitProducts = JSON.parse(outfitProducts);
                if (outfitProducts) {
                    for (const colorId in outfitProducts) { //Voy por cada color al que se parearon outfits products
                        if (Object.hasOwnProperty.call(outfitProducts, colorId)) {
                            // Agarro las combinaciones que habia en db con este color
                            let oldCombinations = await db.OutfitProduct.findAll({
                                where: {
                                    products_id: prodId,
                                    colors_id: colorId
                                }
                            });
                            oldCombinations = getDeepCopy(oldCombinations);
                            // Array de combinaciones de outfit products (que llegan de la vista)
                            const newCombinations = outfitProducts[colorId];

                            // Voy por las combinaciones viejas, si no estan en el array nuevo las borro de db
                            for (let i = 0; i < oldCombinations.length; i++) {
                                const comb = oldCombinations[i];
                                const isInNewCombination = newCombinations.find(newcomb => {
                                    if (newcomb.prodId == comb.outfit_product_id && newcomb.colorId == comb.outfit_color_id) {
                                        return comb
                                    }
                                });
                                if (!isInNewCombination) { //Si no esta, lo borro de db
                                    await db.OutfitProduct.destroy({
                                        where: {
                                            id: comb.id
                                        }
                                    });
                                }
                            };
                            // Voy por las combinaciones NUEVAS, si no estan en DB LAS AGREGA
                            for (let i = 0; i < newCombinations.length; i++) {
                                const comb = newCombinations[i];
                                const isInDB = oldCombinations?.find(oldcomb => {
                                    if (comb.prodId == oldcomb.outfit_product_id && comb.colorId == oldcomb.outfit_color_id) {
                                        return comb
                                    }
                                });
                                if (!isInDB) { //Si no esta, lo agrego a db
                                    await db.OutfitProduct.create({
                                        products_id: prodId,
                                        colors_id: colorId,
                                        outfit_product_id: comb.prodId,
                                        outfit_color_id: comb.colorId
                                    });
                                };
                            };
                        };
                    };
                };
            };

            const updateStocks = async () => {
                try {
                    // Agarro las stocks viejas
                    let oldStocks = await db.Stock.findAll({ where: { products_id: prodId } });
                    let newStocks = stocks;
                    // Hago un map y le agrego ese id de stock para poder modificar en la db
                    newStocks = newStocks.map(stock => {
                        let idToPush = oldStocks.find(oldStock => oldStock.colors_id == stock.colorId && oldStock.sizes_id == stock.sizeId)?.id;
                        // console.log(idToPush);
                        if(idToPush){ //Si encuentra id del stock, quiere decir que esta actualizando, solo modifico quantity
                            return {
                                id: idToPush,
                                quantity: stock.quantity || 0
                            }
                        } 
                        // Sino, le retorno el objeto como para crear ese stock nuevo
                        return {
                            products_id: prodId,
                            colors_id: stock.colorId,
                            sizes_id: stock.sizeId,
                            quantity: stock.quantity || 0
                        }
                        
                    });
                    // return newStocks
                    await db.Stock.bulkCreate(newStocks, {
                        updateOnDuplicate: ["quantity"]
                    });
                } catch (error) {
                    return console.log(`Falle en updateStocks: ${error}`)
                }
            }
            // Agarro el body de la vista editProduct
            let { name, price, description, colors, keywords, details, categories_id, outfitProducts, stocks } = req.body;
            // Tomo el id del producto a editar
            const prodId = req.params.id;
            // Modifico el array keywords, todo minuscula
            keywords = JSON.parse(keywords);
            keywords = keywords.map(key => key.toLowerCase());
            // Modifico el array colors, todos int
            colors = JSON.parse(colors);
            colors = colors.map(col => parseInt(col));
            // Modifico el array details, primera letra en mayuscula, despues minuscula
            details = JSON.parse(details);
            details = details.map(detail => firstCapitalLetter(detail));

            stocks = JSON.parse(stocks);
            // return res.status(200).json({
            //     meta: {
            //         status: 200,
            //         msg: 'Producto Creado Correctamente!'
            //     },
            //     productId: prodId,
            //     newStocks: await updateStocks(),
            // });
            // Agarro el producto  
            let product = await getProduct(prodId);
            // Aca armo el nuevo Producto para hacer el update
            let updatedProduct = {
                name,
                price,
                description,
                categories_id
            };
            // Hago el update del producto
            await db.Product.update(updatedProduct, {
                where: {
                    id: prodId
                }
            });
            updatedProduct = await getProduct(prodId)
            //Hago el update de los archivos
            const files = req.files
            // return console.log(files);
            if (files) {//Si vienen archivos...
                let deletedColorFiles = []; //Array donde va el color que ya borre, para que no haga 2 veces lo mismo
                files.forEach(async (file) => { //Voy por cada imagen, asi armo el array
                    // Capturo id y filename
                    const colorId = parseInt(file.fieldname);
                    // Primero borro las que ya tenia
                    if (!deletedColorFiles.includes(colorId)) {
                        console.log('ESTOY POR BORRAR UN ARCHIVO');
                        await deleteFiles(colorId);
                        deletedColorFiles.push(colorId);
                    }
                    const filename = file.filename
                    // Chequeo si es foto o video
                    const fileType = file.mimetype.startsWith('video/') ? 2 : 1;
                    await db.File.create({
                        filename,
                        file_types_id: fileType,
                        colors_id: colorId,
                        products_id: prodId
                    });
                });
            };
            // Hago el update de las keywords 
            await updateKeywords();
            // Hago el update de los details
            await updateDetails();
            // Hago el update de los colores
            await updateColors();
            // Hago el update de los outfit
            await updateOutfitProducts();
            // Hago el update de stocks
            await updateStocks();
            
            return res.status(200).json({
                meta: {
                    status: 200,
                    msg: 'Producto Actualizado Correctamente!'
                },
                product: updatedProduct
            });

        } catch (error) {
            console.log(`Falle en productController.update: ${error}`);
            return res.json(error);
        }
    },
    newColor: async (req, res) => {
        try {
            const colorToCreate = req.body;
            const colorCreated = await db.Color.create(colorToCreate)
            return res.status(200).json({
                meta: {
                    status: 200,
                    msg: 'Color Creado Correctamente!'
                },
                color: colorCreated
            });
        } catch (error) {
            console.log(`Falle en productController.newColor: ${error}`);
            return res.json(error);
        }

    },
    getWishedProducts: async (req, res) => {
        const { userId } = req.body;
        let userWishlistProducts;
        let msg = 'Error en el proceso, reinicie sesion'
        if (userId) {
            let user = await db.User.findByPk(userId, {
                include: [
                    {
                        // Tengo que traer para cada item del wishlist, el producto y sus fotos
                        association: 'wishlistProducts',
                        include: ['wishedProductColor',
                            {
                                association: 'wishedProduct',
                                include: 'files',
                                paranoid: false
                            }
                        ],
                        paranoid: false


                    }
                ],
                attributes: {
                    exclude: ['password']
                }
            });
            user = getDeepCopy(user);

            // Me quedo solo con una foto
            user.wishlistProducts?.forEach(prod => {
                prod.wishedProduct.files = prod.wishedProduct.files && prod.wishedProduct.files.filter(file => file.file_types_id == 1)
            });
            // Ordeno por orden de mas reciente
            user.wishlistProducts.sort((a, b) => b.id - a.id)
            userWishlistProducts = user.wishlistProducts;
            msg = 'Lista encontrada'
        }
        return res.status(200).json({
            meta: {
                status: 200,
                msg
            },
            userWishlistProducts
        });
    }
};

module.exports = controller;
