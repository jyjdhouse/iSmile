//Database
const User = require('../database/models/User');
// Utils
// const getRelativePath = require('../utils/getRelativePath');
// const secret = require('../utils/secret').secret;

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
    // processRegist: async (req, res) => {
    //     try {
    //    /*      // Traigo errores
    //         let errors = validationResult(req); */
    //         // Ultima ruta que estuvo, para luego redirigir
    //         let relativePath = getRelativePath(req.headers.referer);
            
    //         /*   if (!errors.isEmpty()) { //Si hay errores...
    //             errors = errors.mapped();
    //         } */
            
    //         const emailBody = req.body.email.toLowerCase();
            
    //         const emailAlreadyInDb = await db.User.findOne({
    //             where: {
    //                 email: emailBody
    //             }
    //         });

    //         if(emailAlreadyInDb){
    //             errors = {
    //                 credentials: { msg: "Email ya registrado" }
    //             };
    //             const oldData = {
    //                 email: emailAlreadyInDb.email
    //             }
    //             return res.redirect(`${relativePath}?errors=${JSON.stringify(errors)}&oldData=${JSON.stringify(oldData)}`);
    //         }

    //         // Datos del body
    //         let { name, lastName, email, dni, phone, password, notifications } = req.body
    //         let userData = {
    //             name,
    //             last_name: lastName,
    //             email,
    //             dni,
    //             phone_number: phone,
    //             password: bcrypt.hashSync(password, 10),//encripta la password ingresada ,
    //             notifications: notifications ? 1 : 0,
    //             isAdmin: false 
    //         };
    //         await db.User.create(userData);
    //         return res.redirect(relativePath);
    //     } catch (error) {
    //         console.log(`Falle en userController.processRegist: ${error}`);
    //         return res.json(error);
    //     }
    // },
    /* checkout: async (req, res) => {
        return res.render('checkout', {categories: await getCategories(), countryCodes: await getCountryCodes()})
    }, */
    // logout: async (req, res) => {
    //     try {
    //         let relativePath = getRelativePath(req.headers.referer);
    //         res.clearCookie('userAccessToken');
    //         // res.clearCookie('token');
    //         req.session.destroy();
    //         res.redirect(relativePath);
    //     } catch (error) {
    //         console.log(`Falle en userController.logout: ${error}`);
    //         return res.json(error);
    //     }
    // }
};

module.exports = controller;
