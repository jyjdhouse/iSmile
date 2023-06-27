const db = require('../database/models');
module.exports = async function (id) {
    return await db.Product.findByPk(id,{
        include: [
            'image',       
        ]
    });
}