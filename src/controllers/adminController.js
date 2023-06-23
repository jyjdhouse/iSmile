/* const db = require('../database/models');
const bcrypt = require('bcryptjs');



const controller = {
    preCheckout: async (req, res) => {
        try {
            return res.render('checkout', { categories: await getCategories() })
        } catch (error) {
            console.log(`Falle en adminController.preCheckout: ${error}`);
            return res.json(error);
        }
    },
    changeAdminPass: async (req, res) => {
        try {
            let user = await db.User.findByPk(2);
            let newPassword = '123456';
            await db.User.update({
                password: bcrypt.hashSync(newPassword, 10)
            }, {
                where: {
                    id: 2
                }
            })
            return res.send('listo!')
        } catch (error) {
            console.log(`Falle en adminController.list: ${error}`);
            return res.json(error);
        }
    },
    createProduct: async (req, res) => {
        try {
            let products = await getAllProducts();
            products = adaptProductsToBeListed(products);
            products.forEach(product => { //Dejo a cada color con 1 foto
                product.colors.forEach(color => {
                    color.files = color.files[0];
                });
            });
            // return res.send(products)
            return res.render('productCreate', { colors: await getColors(), categories: await getCategories(), sizes: await getSizes(), products});
        } catch (error) {
            console.log(`Falle en adminController.createProduct: ${error}`);
            return res.json(error);
        }
    },
    editProduct: async (req, res) => {
        try {
            const { id } = req.params
            let product = await getProduct(id);
            // // Hacer una copia profunda de product
            product = getDeepCopy(product);
            
            // Actualizar la propiedad "colors" para que sea [1,2,3] con los ids
            product.colors = product.colors.map(col => col.id);
            
            // return res.send(product);
            return res.render('productEdit', { product, colors: await getColors(), categories: await getCategories(), sizes: await getSizes() })
        } catch (error) {
            console.log(`Falle en adminController.editProduct: ${error}`);
            return res.json(error);
        }
    },
    destroyProduct: async(req,res) => {
        const {id} = req.params;
        await db.Product.destroy({
            where: {
                id
            }
        });
        return res.redirect('/test/list');
    }
};

module.exports = controller;
 */