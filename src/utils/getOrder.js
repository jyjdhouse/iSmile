const db = require('../database/models');
module.exports = async function (id) {
    return await db.Order.findByPk(id,{
        include: ['paymentMethod','orderStatus','orderType','billingAddress','shippingAddress','orderItems']
    });
}