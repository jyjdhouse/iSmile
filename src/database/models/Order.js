module.exports = (sequelize, dataTypes) => {
    let alias = "Order";

    let cols = {
        id: {
            type: dataTypes.STRING(36),
            primaryKey: true,
            autoIncrement: true
        },
        users_id: { type: dataTypes.STRING(36) },
        shipping_addresses_id: {type: dataTypes.STRING(36)},
        order_types_id: {type: dataTypes.INTEGER},
        // payment_methods_id: { type: dataTypes.INTEGER },
        name: {type: dataTypes.STRING(255)},
        last_name: {type: dataTypes.STRING(255)},
        phone: {type: dataTypes.STRING(45)},
    }

    let config = {
        tableName: 'orders',
        paranoid: true
    }

    const Order = sequelize.define(alias, cols, config);

    Order.associate = (models) => {
        Order.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'users_id'
        });
        // Order.belongsTo(models.PaymentMethod, {
        //     as: 'paymentMethod',
        //     foreignKey: 'payment_methods_id'
        // });
        Order.belongsTo(models.OrderType, {
            as: 'orderType',
            foreignKey: 'order_types_id'
        });
        Order.hasOne(models.BillingAddress, {
            as: 'billingAddress',
            foreignKey: 'orders_id',
        });
        Order.belongsTo(models.OrderType, {
            as: 'shippingAddress',
            foreignKey: 'shipping_addresses_id'
        });
        Order.hasMany(models.OrderItem,{
            as:'orderItems',
            foreignKey:'orders_id'
        });
    };

    return Order;
}