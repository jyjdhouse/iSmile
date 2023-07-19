const { body } = require('express-validator');
const db = require('../database/models')
const msg = 'Error al procesar el formulario, intente nuevamente'

const orderIsCompleteValidations = [
    body('name')
        .notEmpty().withMessage(msg)
        .custom((value, { req }) => {
            let name = req.body.name
            let regEx = /^[a-z ,.'-]+$/i;
            if (!regEx.test(name)) {
                throw new Error(msg)
            }
            return true;
        }),
    body('email')
        .notEmpty().withMessage(msg).bail()
        .isEmail().withMessage(msg).bail(),
    // .custom(async(value,{req})=>{
    //     let userEdited = await db.User.findByPk(req.params.id);
    //     let userEmail = req.body.email.toLowerCase();
    //     let emailInDataBase = await db.User.findOne({where:{email:userEmail}})
    //     if(emailInDataBase && userEmail != userEdited.email){
    //         throw new Error("Email ya registrado, ingrese otro")
    //     };
    //     return true;
    // })
    body('phone')
        .custom((value, { req }) => { /*regEX de phone number. Acepta Todo tipo de numero de telefono */
            let regEx = /^[0-9]*$/
            let phone = req.body.phone;
            if (!regEx.test(phone)) {
                throw new Error(msg);
            }
            return true;
        }),
    body('last_name')
        .notEmpty().withMessage(msg),
    body('dni')
        .notEmpty().withMessage(msg),
    body('billing_street')
        .notEmpty().withMessage(msg),
    body('billing_zip_code')
        .notEmpty().withMessage(msg),
    body('billing_province')
        .notEmpty().withMessage(msg),
    body('billing_city')
        .notEmpty().withMessage(msg),
    body('order_types_id')
        .custom((value, { req }) => {
            let type = req.body.order_types_id;
            if (type != 1 && type != 2 && type != 3) {//Quiere decir que no es ningun type aceptado en la db
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
            // Si es distinto a transferencia o cualquier tarjeta arrojo error
            if (methodId != 1 && methodId != 2 && methodId != 3 && methodId != 4 && methodId != 5 ) {
                throw new Error(msg);
            }
            return true;
        }),


];

module.exports = orderIsCompleteValidations;