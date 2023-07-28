const db = require('../database/models');
module.exports = async function () {
    return await db.Product.findAll({
        include: [
            {
                association: 'files',
                include: ['fileType']
            },
            'temporalItems',
            'category'
        ]
    });
}