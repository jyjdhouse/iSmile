const { body } = require('express-validator');
const isJson = require('../utils/isJson');

const productFields = [
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
];

module.exports = productFields;