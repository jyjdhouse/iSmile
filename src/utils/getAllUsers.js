const User = require('../database/models/User');
module.exports = async function (id) {
    return await User.findAll({
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