const db = require('../database/models');
module.exports = async function (id) {
    return await db.User.findAll({
        include: [
            'userCategory','genre',
            {
                association: 'temporalCart',
                include: [{
                    association: 'temporalItems',
                    include: ['product']
                }]
            }
        ],
        attributes: {
            exclude: ['password']
        }
    });
}