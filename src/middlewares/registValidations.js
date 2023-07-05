const {body} = require('express-validator');
const fs = require('fs');
const path = require('path');
const db = require('../database/models')


const registValidations = [
    body('email')
    .notEmpty().withMessage('Debes completar el/los campo/s').bail()
    .isEmail().withMessage('Debe ingresar un email válido').bail()
    .custom(async(value,{req})=>{
        let userEmail = req.body.email.toLowerCase();
        let emailInDataBase = await db.User.findOne({where:{email:userEmail}})
        if(emailInDataBase){
            throw new Error("Email ya registrado, ingrese otro")
        };
        return true;
    }),
    body('password')
    .isLength({min: 1}) .withMessage('La contraseña debe tener un mínimo de 1 caracter'),
    body('re-password')
    .custom((value,{req})=>{
        if(req.body.password!=req.body['re-password']){
            throw new Error('No coinciden las contraseñas')
        }
        return true;
    })
];

module.exports=registValidations;