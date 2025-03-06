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
        billing_addresses_id: {type: dataTypes.STRING(36)},
        is_same_address: {type: dataTypes.BOOLEAN},
        order_status_id: {type: dataTypes.INTEGER},
        order_types_id: {type: dataTypes.INTEGER},
        payment_methods_id: { type: dataTypes.INTEGER },
        total: { type: dataTypes.INTEGER },
        billing_first_name: {type: dataTypes.STRING(255)},
        billing_last_name: {type: dataTypes.STRING(255)},
        billing_email: {type: dataTypes.STRING(255)},
        billing_phone: {type: dataTypes.STRING(45)},
        billing_id: {type: dataTypes.STRING(45)},
        tra_id: {type: dataTypes.TEXT},
        date: { type: dataTypes.DATE},
        pending_payment_date: {type: dataTypes.DATE},
        is_pending_payment_expired : {type: dataTypes.TINYINT},
        details: {type: dataTypes.TEXT},
        oca_numero_envio: {type: dataTypes.STRING(20)},
        oca_orden_retiro: {type: dataTypes.STRING(20)},
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
        Order.belongsTo(models.BillingAddress, {
            as: 'billingAddress',
            foreignKey: 'billing_addresses_id',
        });
        Order.belongsTo(models.ShippingAddress, {
            as: 'shippingAddress',
            foreignKey: 'shipping_addresses_id',
        });
        Order.hasMany(models.OrderItem,{
            as:'orderItems',
            foreignKey:'orders_id'
        });
    };

    return Order;
}