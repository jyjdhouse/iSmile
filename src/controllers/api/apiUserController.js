const db = require('../../database/models');
const users = require('../../utils/staticDB/user')

// Librerias
const jwt = require('jsonwebtoken');
const getAllUsers = require('../../utils/getAllUsers');

// From utils
// const secret = require('../../utils/secret').secret;

const controller = {
    getLoggedUserId: async (req, res) => {
        try {
            let { userId, msg } = req;
            let user = await db.User.findByPk(userId, {
                attributes: {
                    exclude: ['password']
                },
                include: [
                    {
                        association: 'temporalCart',
                        include: [
                            {
                                association: 'temporalItems',
                                include: [
                                    {
                                        association: 'product',
                                        include: [
                                            'files'
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            });
            return res.status(200).json({
                meta: {
                    status: 200,
                    msg
                },
                user
            })

        } catch (error) {
            console.log(`Falle en apiUserController.getLoggedUser: ${error}`);
            return res.send(error)
        }
    },
    createTempCart: async (req, res) => {
        try {

            const { userId, prodId } = req.body;
            const tempCart = await db.TemporalCart.create({
                user_id: userId
            });
            console.log(tempCart);
            await db.TemporalItem.create({
                temporal_cart_id: parseInt(tempCart.id),
                product_id: parseInt(prodId),
                quantity: 1
            })

            return res.status(200).json({
                ok: true,
                meta: {
                    status: 200,
                    url: `api/user/createTempCart`
                },
                tempCart
            });

        } catch (error) {
            console.log('El error fue en userApiController.createTempCart: ' + error);
            return res.json(error);
        }
    },
    addTempItem: async (req, res) => {
        try {
            let { tempCartId, prodId } = req.body;
            let tempItem = await db.TemporalItem.create({
                temporal_cart_id: parseInt(tempCartId),
                product_id: parseInt(prodId),
                quantity: 1
            });
            return res.json({
                ok: true,
                meta: {
                    status: 200,
                    url: `api/product/addTempItem`
                },
                tempItem
            });
        } catch (error) {
            console.log('El error fue en productApiController.addTempItem: ' + error);
            return res.json(error);
        }
    },
    deleteTempItem: async (req, res) => {
        try {
            let {prodId, user} = req.body;
            let deletedItem = await db.TemporalItem.destroy({
                where: {
                    product_id: prodId,
                    temporal_cart_id: user.temporalCart.id
                }
            })
            return res.json({
                ok: true,
                meta: {
                    status: 200,
                    url: `api/product/deleteTempItem`
                }
            });
        } catch (error) {
            console.log('El error fue en userApiController.deleteTempItem: ' + error);
            return res.json(error);
        }
    }
};

module.exports = controller;
