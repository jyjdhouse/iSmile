const db = require('../database/models');
module.exports = async function (id) {
    return await db.User.findAll({
        include: [
            'userCategory',
            {
                association: 'wishlistProducts',
                include: [{
                    association: 'wishedProduct',
                    include: ['files']
                }]
            }
        ],
        attributes: {
            exclude: ['password']
        }
    });
}