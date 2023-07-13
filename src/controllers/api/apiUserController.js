const db = require('../../database/models');

// Librerias
const jwt = require('jsonwebtoken');
const getAllUsers = require('../../utils/getAllUsers');
const getUser = require('../../utils/getUser');
const nodemailer = require('nodemailer');
// From utils
const secret = require('../../utils/secret').secret;
const isJwtError = require('../../utils/isJwtError');
const getRelativePath = require('../../utils/getRelativePath');

const controller = {
    getLoggedUserId: async (req, res) => {
        try {
            let userId = req.userId;
            if (!userId) { //Si no viene el userID, no se chekeo el token ==> devuelvo error en la solicitud
                const error = new Error('Error en la solicitud, debes iniciar sesion nuevamente');
                // Devolviendo una respuesta de error
                res.status(400).json({
                    ok: false,
                    error: error.message
                });
                return
            }
            let msg = req.msg;

            let user = await getUser(userId);
            delete user?.password; // Para no llevar la password session 
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
            // TODO: Preguntar a martin y cambiar el body por lo que me llega en el middleware de checkForToken
            const { userId, prodId } = req.body;
            
            const tempCart = await db.TemporalCart.create({
                users_id: userId
            });
            console.log(tempCart);
            await db.TemporalItem.create({
                temporal_cart_id: parseInt(tempCart.id),
                products_id: parseInt(prodId),
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
                products_id: parseInt(prodId),
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
            let { prodId, user } = req.body;
            let deletedItem = await db.TemporalItem.destroy({
                where: {
                    products_id: prodId,
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
    },
    changePassword: async (req, res) => {
        try {

            const userToChangePassID = req.userId;
            if (!userToChangePassID) { //Si no viene el userID, no se chekeo el token ==> devuelvo error en la solicitud
                const error = new Error('Error en la solicitud, debes iniciar sesion nuevamente');
                // Devolviendo una respuesta de error
                res.status(400).json({
                    ok: false,
                    error: error.message
                });
                return
            }
            // El principio de la url
            const host = req.headers.host;

            const user = await getUser(userToChangePassID);

            // Si la sesion no tiene el userLoggedId devuelvo ERROR
            if (!user) res.status(404).json({ error: 'Usuario no encontrado' });
            let userEmail = user.email;
            const token = jwt.sign({ id: userToChangePassID }, secret, { expiresIn: '1h' }); // genera el token
            // Guardo el token en la db
            await db.User.update({
                password_token: token
            }, {
                where: {
                    id: userToChangePassID
                }
            });
            // URL que mando por mail
            const changePassURL = `"http://${host}/user/cambiar-contrasena/${token}`;

            // Configurar el transporte de correo electrónico con nodemailer
            let transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'janoo.pereira@gmail.com',
                    pass: 'wubwcoifjtogwonk'
                }
            });
            const mailOptions = {
                from: 'janoo.pereira@gmail.com', // Tu dirección de correo electrónico
                to: userEmail, // Correo electrónico del usuario
                subject: 'Cambio de contraseña',
                text: `Hola, haz clic en el siguiente enlace para cambiar tu contraseña: ${changePassURL}`,
                html: `<p>Hola, haz clic <a href=${changePassURL}">aquí</a> para cambiar tu contraseña.</p>`
            };

            // Enviar el correo electrónico
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Correo electrónico enviado: ' + info.response);
                }
            });
            // Armo la respuesta para mostrar en el front
            return res.status(200).json({
                meta: {
                    status: 200
                },
                ok: true,
                msg: 'Se ha enviado un enlace para cambiar la contraseña a tu correo electrónico.'
            });
        } catch (error) {
            console.log(`Falle en apiUserController.changePassword: ${error}`);
            if (isJwtError(error)) { //Si es error de jwt
                let msg = "Error al cambiar la contraseña"
                return res.redirect(`${lastPath}?alert=${msg}`);
            }
            return res.json(error);
        }
    },
    forgetPassword: async (req, res) => {
        try {
            let { mail } = req.body;
            // Busco si hay usuario asociado a ese mail. Si lo hay le armo todo
            // El principio de la url
            const host = req.headers.host;

            const user = await db.User.findOne({
                where: {
                    email: mail
                }
            });

            // Si la sesion no tiene el userLoggedId vuelvo a la home
            if (!user) return //res.status(404).json({ error: 'Usuario no encontrado' });

            const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1h' }); // genera el token
            // Guardo el token en la db
            await db.User.update({
                password_token: token
            }, {
                where: {
                    id: user.id
                }
            });
            // URL que mando por mail
            const changePassURL = `"http://${host}/user/cambiar-contrasena/${token}`;

            // Configurar el transporte de correo electrónico con nodemailer
            let transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'janoo.pereira@gmail.com',
                    pass: 'wubwcoifjtogwonk'
                }
            });
            const mailOptions = {
                from: 'janoo.pereira@gmail.com', // Tu dirección de correo electrónico
                to: mail, // Correo electrónico del usuario
                subject: 'Cambio de contraseña',
                text: `Hola, haz clic en el siguiente enlace para cambiar tu contraseña: ${changePassURL}`,
                html: `<p>Hola, haz clic <a href=${changePassURL}">aquí</a> para cambiar tu contraseña.</p>`
            };

            // Enviar el correo electrónico
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Correo electrónico enviado: ' + info.response);
                }
            });
            // Armo la respuesta para mostrar en el front
            return res.json({
                meta: {
                    status: 200
                },
                ok: true,
                msg: 'Se ha enviado un enlace para cambiar la contraseña a tu correo electrónico.'
            });
        } catch (error) {
            console.log(`Falle en apiUserController.forgetPassword: ${error}`);
            return res.json(error)
        }
    }
};

module.exports = controller;
