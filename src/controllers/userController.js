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
            const data = await axios('http://localhost:4500/api/user/1')
            const response = data.data.meta
            const user = response.user
            return res.render('userProfile', { user })
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
    /* checkout: async (req, res) => {
        return res.render('checkout', {categories: await getCategories(), countryCodes: await getCountryCodes()})
    }, */
};

module.exports = controller;
