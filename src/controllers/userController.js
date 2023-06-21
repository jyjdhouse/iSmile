//Database
const db = require('../database/models');
// Utils
const getRelativePath = require('../utils/getRelativePath');
const secret = require('../utils/secret').secret;
const getCategories = require('../utils/getCategories');
const getCountryCodes = require('../utils/getCountryCodes');
// Librerias
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { validationResult } = require('express-validator');

const controller = {

    userProfile: async(req,res)=>{
        try {
            return res.render('userProfile')
        } catch (error) {
            console.log(`Falle en mainController.userProfile: ${error}`);
            return res.json({error})
        }
    },
    login: async (req, res) => {
        try {
            let errors;
            let userData = req.body;

            // Ultima ruta que estuvo, para luego redirigir
            let relativePath = getRelativePath(req.headers.referer);

            let userToLog = await db.User.findOne({ where: { email: userData.email } });

            // Si hay usuario
            if (userToLog) {
                // Comparo contrasenas
                if (bcrypt.compareSync(userData.password, userToLog.password)) {

                    const cookieTime = (1000 * 60) * 60 * 24 * 7 //1 Semana
                    delete userToLog.password; // Para no llevar la password session 

                    req.session.userLoggedId = userToLog.id; //Defino en sessions al usuario loggeado

                    // Generar el token de autenticación
                    const token = jwt.sign({ id: userToLog.id }, secret, { expiresIn: '1w' }); // genera el token
                    res.cookie('userAccessToken',token, {maxAge: cookieTime, httpOnly: true, /*TODO: Activarlo una vez deploy => secure: true,*/  sameSite: "strict"});

                    return res.redirect(relativePath);
                }
                // Si llego aca es porque esta mal la contrasena
                errors = {
                    credentials: { msg: "Credenciales Incorrectas" }
                }
                return res.redirect(`${relativePath}?loginErrors=${JSON.stringify(errors)}`);

            }
            // Si llego aca es porque esta mal el email o password
            errors = {
                credentials: { msg: "Credenciales Incorrectas" }
            };
            const oldData = {
                email: userData.email
            }
            return res.redirect(`${relativePath}?loginErrors=${JSON.stringify(errors)}&oldData=${JSON.stringify(oldData)}`);

        } catch (error) {
            console.log(`Falle en userController.login: ${error}`);
            return res.json(error);
        }
    },
    processRegist: async (req, res) => {
        try {
       /*      // Traigo errores
            let errors = validationResult(req); */
            // Ultima ruta que estuvo, para luego redirigir
            let relativePath = getRelativePath(req.headers.referer);
            
            /*   if (!errors.isEmpty()) { //Si hay errores...
                errors = errors.mapped();
            } */
            
            const emailBody = req.body.email.toLowerCase();
            
            const emailAlreadyInDb = await db.User.findOne({
                where: {
                    email: emailBody
                }
            });

            if(emailAlreadyInDb){
                errors = {
                    credentials: { msg: "Email ya registrado" }
                };
                const oldData = {
                    email: emailAlreadyInDb.email
                }
                return res.redirect(`${relativePath}?errors=${JSON.stringify(errors)}&oldData=${JSON.stringify(oldData)}`);
            }

            // Datos del body
            let { name, lastName, email, dni, phone, password, notifications } = req.body
            let userData = {
                name,
                last_name: lastName,
                email,
                dni,
                phone_number: phone,
                password: bcrypt.hashSync(password, 10),//encripta la password ingresada ,
                notifications: notifications ? 1 : 0,
                user_categories_id: 2 //Siempre 2 (customer)
            };
            await db.User.create(userData);
            return res.redirect(relativePath);
        } catch (error) {
            console.log(`Falle en userController.processRegist: ${error}`);
            return res.json(error);
        }
    },
    /* checkout: async (req, res) => {
        return res.render('checkout', {categories: await getCategories(), countryCodes: await getCountryCodes()})
    }, */
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
    }
};

module.exports = controller;
