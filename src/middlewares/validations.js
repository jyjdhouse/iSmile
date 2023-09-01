const { body } = require('express-validator');
const db = require('../database/models');
const msg = 'Error al procesar el formulario, intente nuevamente'
// UTILS
const isJson = require('../utils/isJson');
const isValidDate = require('../utils/isValidDate');
const regExs = require('../utils/regularExpresions');
const orderTypes = require('../utils/staticDB/orderTypes');
const paymentMethods = require('../utils/staticDB/paymentMethods');
const provincesDB = require('../utils/staticDB/provinces');
const genresDB = require('../utils/staticDB/genres');
const passwordValidation = require('../utils/passwordValidation');

module.exports = {
    userRegistValidations: [
        // Me fijo que esten completos y que sean tipo string
        body(['email', 'password', 're-password']).notEmpty().withMessage('Debes completar el/los campo/s').bail()
            .custom((value, { req }) => {
                // Si viene formato json entonces lo parseo, sino me fijo directamente
                if (isJson(value)) value = JSON.parse(value);
                if (typeof value !== "string") {
                    throw new Error()
                };
                return true
            }),
        body('email')
            .isEmail().withMessage('Debe ingresar un email válido').bail()
            .custom(async (value, { req }) => {
                let userEmail = req.body.email.toLowerCase();
                let emailInDataBase = await db.User.findOne({ where: { email: userEmail } })
                if (emailInDataBase) {
                    throw new Error("Email ya registrado, ingrese otro")
                };
                return true;
            }),
    ],
    userUpdateValidations: [
        // Me fijo que esten completos
        body(['first_name', 'last_name', 'phone', 'dni']).notEmpty().withMessage('Debes completar el/los campo/s').bail(),
        // Me fijo que estos datos sean solo valores numericos
        body(['phone', 'dni', 'zip_code']).custom((value, { req }) => {
            if (!regExs.justNumbers.test(value)) {
                // El valor contiene caracteres no numéricos
                throw new Error();
            }
            return true
        }),
        // Me fijo que estos datos sean solo valores de letras
        body(['first_name', 'last_name']).custom((value, { req }) => {
            if (!regExs.justLetters.test(value)) {
                // El valor contiene caracteres no numéricos
                throw new Error();
            }
            return true
        }),
        // Me fijo que la fecha tenga valor 'YYYY-MM-DD' y que sea valida
       body('birth_date').custom((value, { req }) => {
            if(!value) {
                return true
            } else {
                const dateIsValid = isValidDate(value)
                if (!dateIsValid) {
                    // El valor contiene una fecha no admitible
                    throw new Error();
                }
                return true
            }
            
        }),
        // Me fijo que el valor de genre este en la db
        body('genre').custom((value, { req }) => {
            const genreIsInDB = genresDB.find(genre => genre.id == value)
            if (!genreIsInDB) {
                // El valor contiene una genres_id no admitible
                throw new Error();
            }
            return true
        }),
        // Me fijo que el valor de provinces_id este en la db
        body('provinces_id').custom((value, { req }) => {
            const provinceIsInDB = provincesDB.find(prov => prov.id == value)
            if (!provinceIsInDB) {
                // El valor contiene una provinces_id no admitible
                throw new Error();
            }
            return true
        }),
        body('dni').custom((value, { req }) => {
            if (value.length != 8) {
                // La longitud debe ser 8
                throw new Error("La longitud debe ser 8");
            }
            return true
        }),
        body('phone').custom((value, { req }) => {
            if (value.length > 11) {
                throw new Error("Longitud mayor a la esperada");
            }
            return true
        })
    ],
    productFieldsValidations: [
        // Validar que los campos necesarios esten
        body(['name', 'price']).notEmpty().bail(),
        // Me fijo que estos campos sean STRINGS
        body(['name', 'description', 'ingredients', 'size', 'mainImage'])
            .optional().isString().bail(),
        // Me fijo que estos campos sean INT
        body(['price', 'stock', 'discount'])
            .optional().isInt().bail(),
        // Esto es para chequear currentImgs (puede ser array o string nomas)
        body('current_imgs').custom((value, { req }) => {
            let currentImgs = req.body.current_imgs;
            if (currentImgs) {
                // Si viene formato json entonces lo parseo, sino me fijo directamente
                if (isJson(currentImgs)) currentImgs = JSON.parse(currentImgs);
                if (!Array.isArray(currentImgs) && typeof currentImgs !== "string") {
                    throw new Error()
                };
            }

            return true;
        }),
    ],
    orderIsCompleteValidations: [
        // Primero me fijo que no esten vacios los campos obligatorios
        body(['name', 'last_name', 'email', 'phone', 'dni', 'billing_street', 'billing_zip_code', 'billing_province', 'billing_city']).notEmpty().withMessage(msg),
        // Me fijo que sean solo letras y espacios
        body(['name', 'last_name']).custom((value, { req }) => {
            let name = req.body.name
            let regEx = regExs.justLetters;
            if (!regEx.test(name)) {
                throw new Error(msg)
            }
            return true;
        }),
        body('email').isEmail().withMessage(msg).bail(),
        // Me fijo que sea solo numeros. Le pongo el optional porque si no viene ya rompe por el primer validation
        body(['phone', 'dni', 'billing_zip_code', 'shipping_zip_code']).optional().custom((value, { req }) => { /*regEX de phone number. Acepta Todo tipo de numero de telefono */
            let regEx = regExs.justNumbers;
            if (!regEx.test(value)) {
                throw new Error(msg);
            }
            return true;
        }),

        body('order_types_id').custom((value, { req }) => {
            let typeInDB = orderTypes.find(typeDB => typeDB.id == value)
            if (!typeInDB) {//Quiere decir que no es ningun type aceptado en la db
                throw new Error(msg);
            }
            return true;
        }),
        body('shipping_street').custom((value, { req }) => {
            let useSameAddress = req.body.use_same_address;
            let orderType = req.body.order_types_id;
            let useUserAddress = req.body.use_user_address;
            //Si es envio, no usan misma direccion y esta vacio doy error
            if (orderType == 1 && !useUserAddress && !useSameAddress && !value) {
                throw new Error(msg);
            }
            return true;
        }),
        body('shipping_zip_code').custom((value, { req }) => {
            let useSameAddress = req.body.use_same_address;
            let orderType = req.body.order_types_id;
            let useUserAddress = req.body.use_user_address;
            //Si es envio, no usan misma direccion y esta vacio doy error
            if (orderType == 1 && !useUserAddress && !useSameAddress && !value) {
                throw new Error(msg);
            }
            return true;
        }),
        body('shipping_city').custom((value, { req }) => {
            let useSameAddress = req.body.use_same_address;
            let orderType = req.body.order_types_id;
            let useUserAddress = req.body.use_user_address;
            //Si es envio, no usan misma direccion y esta vacio doy error
            if (orderType == 1 && !useUserAddress && !useSameAddress && !value) {
                throw new Error(msg);
            }
            return true;
        }),
        body('shipping_province').custom((value, { req }) => {
            let useSameAddress = req.body.use_same_address;
            let provinceInDB = value ? provincesDB.find(prov => prov.id == value) : null;
            let orderType = req.body.order_types_id;
            let useUserAddress = req.body.use_user_address;
            //Si es envio, no usan misma direccion y esta vacio doy error
            if (orderType == 1 && !useUserAddress && !useSameAddress && !provinceInDB) {
                throw new Error(msg);
            }
            return true;
        }),
        body('payment_methods_id')
            .custom((value, { req }) => {
                let methodId = req.body.payment_methods_id;
                let paymentMethodInDB = paymentMethods.find(payMeth => payMeth.id == methodId)
                // Si es distinto a transferencia o cualquier tarjeta arrojo error
                if (!paymentMethodInDB) {
                    throw new Error(msg);
                }
                return true;
            }),
    ],
    passwordValidations: [
        body(['password', 're-password']).notEmpty().withMessage('Debes completar el/los campo/s').bail()
            .custom((value, { req }) => {
                // Si viene formato json entonces lo parseo, sino me fijo directamente
                if (isJson(value)) value = JSON.parse(value);
                if (typeof value !== "string") {
                    throw new Error('Error en tipo de dato')
                };
                return true
            }),
        body('password').custom((value, { req }) => {
            if (!passwordValidation(value)) {
                throw new Error('La contraseña no cumple con los requisitos')
            }
            return true
        }),
        body('re-password').custom((value, { req }) => {
            if (req.body.password != value) {
                throw new Error('No coinciden las contraseñas')
            }
            return true;
        })
    ]
}