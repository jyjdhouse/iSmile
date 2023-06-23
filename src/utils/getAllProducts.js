const Product = require('../database/models/Product');
module.exports = async function (id) {
    return await Product.findAll({
        include: [
            'category',
        ]
    });
}