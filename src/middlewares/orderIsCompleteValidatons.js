const { body } = require('express-validator');
const db = require('../database/models')
const msg = 'Error al procesar el formulario, intente nuevamente'
// UTILS
const regExs= require('../utils/regularExpresions');
const orderTypes = require('../utils/staticDB/orderTypes');
const paymentMethods = require('../utils/staticDB/paymentMethods');

const orderIsCompleteValidations = [
    // Primero me fijo que no esten vacios los campos obligatorios
    body(['name','last_name','email','phone','dni','billing_street','billing_zip_code','billing_province','billing_city']).notEmpty().withMessage(msg),
    body(['name','last_name'])
    .custom((value, { req }) => {
        let name = req.body.name
        let regEx = regExs.justLetters;
        if (!regEx.test(name)) {
            throw new Error(msg)
        }
        return true;
    }),
    body('email')
        .isEmail().withMessage(msg).bail(),
    
    body('phone')
        .custom((value, { req }) => { /*regEX de phone number. Acepta Todo tipo de numero de telefono */
            let regEx = regExs.justNumbers;
            let phone = req.body.phone;
            if (!regEx.test(phone)) {
                throw new Error(msg);
            }
            return true;
        }),

    body('order_types_id')
        .custom((value, { req }) => {
            let type = req.body.order_types_id;
            let typeInDB = orderTypes.find(typeDB=>typeDB.id==type)
            if (!typeInDB) {//Quiere decir que no es ningun type aceptado en la db
                throw new Error(msg);
            }
            return true;
        }),
    body('shipping_street')
        .custom((value, { req }) => {
            let useSameAddress = req.body.use_same_address;
            let bodyValue = req.body.shipping_street;
            let orderType = req.body.order_types_id;
            let useUserAddress = req.body.use_user_address;
            //Si es envio, no usan misma direccion y esta vacio doy error
            if (orderType == 1 && !useUserAddress && !useSameAddress && !bodyValue) {
                throw new Error(msg);
            }
            return true;
        }),
    body('shipping_zip_code')
        .custom((value, { req }) => {
            let useSameAddress = req.body.use_same_address;
            let bodyValue = req.body.shipping_zip_code;
            let orderType = req.body.order_types_id;
            let useUserAddress = req.body.use_user_address;
            //Si es envio, no usan misma direccion y esta vacio doy error
            if (orderType == 1 && !useUserAddress && !useSameAddress && !bodyValue) {
                throw new Error(msg);
            }
            return true;
        }),
    body('shipping_city')
        .custom((value, { req }) => {
            let useSameAddress = req.body.use_same_address;
            let bodyValue = req.body.shipping_city;
            let orderType = req.body.order_types_id;
            let useUserAddress = req.body.use_user_address;
            //Si es envio, no usan misma direccion y esta vacio doy error
            if (orderType == 1 && !useUserAddress && !useSameAddress && !bodyValue) {
                throw new Error(msg);
            }
            return true;
        }),
    body('shipping_province')
        .custom((value, { req }) => {
            let useSameAddress = req.body.use_same_address;
            let bodyValue = req.body.shipping_province;
            let orderType = req.body.order_types_id;
            let useUserAddress = req.body.use_user_address;
            //Si es envio, no usan misma direccion y esta vacio doy error
            if (orderType == 1 && !useUserAddress && !useSameAddress && !bodyValue) {
                throw new Error(msg);
            }
            return true;
        }),
    body('payment_methods_id')
        .custom((value, { req }) => {
            let methodId = req.body.payment_methods_id;
            let paymentMethodInDB = paymentMethods.find(payMeth=>payMeth.id==methodId)
            // Si es distinto a transferencia o cualquier tarjeta arrojo error
            if (!paymentMethodInDB ) {
                throw new Error(msg);
            }
            return true;
    }),


];

module.exports = orderIsCompleteValidations;