const db = require('../database/models')
module.exports = async function(id){
    return await db.User.findByPk(id, {
        attributes: {
            exclude: ['password']
        },
        include: [
            {
                association: 'temporalCart',
                include: [
                    {
                        association: 'temporalItems',
                        include: [
                            {
                                association: 'product',
                                include: [
                                    'files'
                                ]
                            }
                        ]
                    }
                ]
            },
            'userAddress',
            'userCategory',
            'genre'
        ]
    });
}