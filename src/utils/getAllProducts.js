const db = require('../database/models');
module.exports = async function (id) {
    return await db.Product.findAll({
        include: [
            'keywords',
            'colors',
            'details',
            'category',
            'stocks',
            {
                association: 'files',
                include: ['color', 'fileType']
            },
            {
                association: 'wishedUsers',
                attributes: ['id'],
                include: ['wishlistProducts']
            },
            {
                association: 'outfitProducts',
                // include: ['color']
            },
            

        ]
    });
}