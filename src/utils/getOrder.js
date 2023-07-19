const db = require('../database/models');
module.exports = async function (id) {
    return await db.Order.findByPk(id,{
        include: ['billingAddress','shippingAddress','orderItems']
    });
}