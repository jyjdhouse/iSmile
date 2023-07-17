const db = require('../database/models');
module.exports = async function () {
    return await db.Order.findAll({
        include: ['paymentMethod','orderStatus','orderType','billingAddress','shippingAddress','orderItems']
    });
}