//Database
const db = require('../database/models');
const axios = require('axios')
// Utils
const getRelativePath = require('../utils/getRelativePath');
const secret = require('../utils/secret').secret;

// Librerias
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { validationResult } = require('express-validator');
const provinces = require('../utils/staticDB/provinces')
const controller = {

    userProfile: async (req, res) => {
        try {
            const user = await db.User.findByPk(req.session.userLoggedId,{
                include: ['address']
            })
            // return res.send(user);
            return res.render('userProfile', { user, provinces })
        } catch (error) {
            console.log(`Falle en userController.userProfile: ${error}`);
            return res.json({ error })
        }
    },
    checkout: async (req, res) => {
        return res.render('checkout.ejs', { provinces });
    },
    processRegist: async (req, res) => {
        try {
            // Ultima ruta que estuvo, para luego redirigir
            let relativePath = getRelativePath(req.headers.referer);

            // Traigo errores
            let errors = validationResult(req);

            if (!errors.isEmpty()) { //Si hay errores en el back...
                errors = errors.mapped();
                let registErrors = {
                    msg: `${errors.email ? errors.email.msg : errors['re-password'].msg}`//Si viene el del mail le mando primero ese
                }
                return res.redirect(`${relativePath}?errors=${true}&registErrors=${JSON.stringify(registErrors)}`);
            }

            const emailBody = req.body.email.toLowerCase();

            const emailAlreadyInDb = await db.User.findOne({
                where: {
                    email: emailBody
                }
            });

            if (emailAlreadyInDb) {
                errors = {
                    credentials: { msg: "Email ya registrado" }
                };
                const oldData = {
                    email: emailAlreadyInDb.email
                }
                return res.redirect(`${relativePath}?errors=${JSON.stringify(errors)}&oldData=${JSON.stringify(oldData)}`);
            }

            // Datos del body
            let { password } = req.body
            let userData = {
                first_name: '',
                last_name: '',
                dni: '',
                email: emailBody,
                password: bcrypt.hashSync(password, 10),//encripta la password ingresada ,
                wpp_notifications: 0,
                email_notifications: 0,
                email_newsletter: 0,
                user_categories_id: 3 //Cliente
            };
            const userCreated = await db.User.create(userData); //Creo el usuario
            // Lo tengo que loggear directamente
            const cookieTime = (1000 * 60) * 60 * 24 * 7 //1 Semana

            req.session.userLoggedId = userCreated.id; //Defino en sessions al usuario loggeado

            // Generar el token de autenticación
            const token = jwt.sign({ id: userCreated.id }, secret, { expiresIn: '1w' }); // genera el token
            res.cookie('userAccessToken', token, { maxAge: cookieTime, httpOnly: true, /*TODO: Activarlo una vez deploy => secure: true,*/  sameSite: "strict" });

            // Lo redirijo al prefil para completar la info
            return res.redirect(`/user/profile?completeForm=${true}`);
        } catch (error) {
            console.log(`Falle en userController.processRegist: ${error}`);
            return res.json(error);
        }
    },
    logout: async (req, res) => {
        try {
            let relativePath = getRelativePath(req.headers.referer);
            res.clearCookie('userAccessToken');
            // res.clearCookie('token');
            req.session.destroy();
            res.redirect(relativePath);
        } catch (error) {
            console.log(`Falle en userController.logout: ${error}`);
            return res.json(error);
        }
    },
    login: async (req, res) => {
        try {
            // Ultima ruta que estuvo, para luego redirigir
            let relativePath = getRelativePath(req.headers.referer);

            let userData = req.body;

            let userToLog = await db.User.findOne({ where: { email: userData.email } });
            // return res.send(userToLog);
            // Si hay usuario
            if (userToLog) {
                // Comparo contrasenas
                if (bcrypt.compareSync(userData.password, userToLog.password)) {

                    const cookieTime = (1000 * 60) * 60 * 24 * 7 //1 Semana

                    req.session.userLoggedId = userToLog.id; //Defino en sessions al usuario loggeado

                    // Generar el token de autenticación
                    const token = jwt.sign({ id: userToLog.id }, secret, { expiresIn: '1w' }); // genera el token
                    res.cookie('userAccessToken', token, { maxAge: cookieTime, httpOnly: true, /*TODO: Activarlo una vez deploy => secure: true,*/  sameSite: "strict" });

                    return res.redirect(relativePath);
                }
                // Si llego aca es porque esta mal la contrasena
                return res.redirect(`${relativePath}?loginErrors=${true}`);

            }
            // Si llego aca es porque esta mal el email o password
            return res.redirect(`${relativePath}?loginErrors=${true}`);

        } catch (error) {
            console.log(`Falle en userController.login: ${error}`);
            return res.json(error);
        }
    },
    update: async(req,res) =>{
        let userToUpdate = await db.User.findByPk(req.session.userLoggedId,{
            include: ['address']
        })
        let userBodyData = req.body;
        
        // Datos para la tabla user
        let userDataDB = {
            first_name: userBodyData.first_name,
            last_name: userBodyData.last_name,
            phone: userBodyData.phone,
            dni: userBodyData.dni,
            wpp_notifications: parseInt(userBodyData.wpp_notifications),
            email_notifications: parseInt(userBodyData.email_notifications),
            email_newsletter: parseInt(userBodyData.email_newsletter),
        };
        // Actualizo el usuario
        await db.User.update(userDataDB,{
            where: {
                id: userToUpdate.id
            }
        })
        // Datos para la tabla address
        // Armo el objeto address con los datos que me llegan del form
        let createdAddress,addressDataDB;
        let addressBody = {
            street: userBodyData.street || null,
            apartment: userBodyData.apartment || null,
            city: userBodyData.city || null,
            zip_code: userBodyData.zip_code || null
        }
        // Me fijo si son todos los valores nulos, entonces no creo el address
        const addressAllKeysNull = Object.values(addressBody).every(value => value === null);
        // return res.send(addressAllKeysNull)
        if(!userToUpdate.address){//Si no tiene una direccion tengo que crear una
            // Si completo por lo menos algun address data
            if(!addressAllKeysNull){
                addressDataDB = {
                    ...addressBody,
                    provinces_id: userBodyData.provinces_id,
                    user_id: userToUpdate.id
                };
                // La creo
                createdAddress = await db.Address.create(addressDataDB);
            }  
        } else{ // Si ya tenia
            addressDataDB = {
                ...addressBody,
                provinces_id: userBodyData.provinces_id,
                user_id: userToUpdate.id
            };
            // La actualizo
            await db.Address.update(addressDataDB,{
                where: {
                    id: userToUpdate.address.id
                }
            });
        }
        return res.redirect('/user/profile')
    }
};

module.exports = controller;
