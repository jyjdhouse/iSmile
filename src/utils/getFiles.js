const db = require('../database/models');
module.exports = async function (id) {
    return await db.File.findAll({
        include: [
            'color',
            'fileType',
            'product',
        ]
    });
}