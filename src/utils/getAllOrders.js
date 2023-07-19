const db = require('../database/models');
module.exports = async function () {
    return await db.Order.findAll({
        include: ['billingAddress','shippingAddress','orderItems']
    });
}