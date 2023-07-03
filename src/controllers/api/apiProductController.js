const db = require('../../database/models');
const Sequelize = require('sequelize');

// // From utils
// const getProduct = require('../../utils/getProduct.js');
// const getDeepCopy = require('../../utils/getDeepCopy');
// const getAllProducts = require('../../utils/getAllProducts');

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
    addWishlistProduct: async (req, res) => {
        try {
            const { productId, userId, colorId } = req.body;
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
    create: async (req, res) => {
        try {
          
            let { name, price, description, category } = req.body;
            let images = req.files;

            let productObject = {
                name,
                price,
                description,
                categories_id: category
            };

            const newProduct = await db.Product.create(productObject);

            let imagesObject = images.map(obj => {
                return {
                    image: obj.path,
                    product_id: newProduct.id
                }
            });
            await db.Product_Image.bulkCreate(imagesObject);


            return res.status(200).json({
                meta: {
                    status: 200,
                    msg: 'Producto creado Correctamente!'
                },
                product: newProduct,
            });
        } catch (error) {
            console.log(`Falle en apiProductController.create: ${error}`);
            return res.json(error);
        }
    },
    update: async (req, res) => {
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
};

module.exports = controller;
