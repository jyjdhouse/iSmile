module.exports = (sequelize, dataTypes) => {
    let alias = "OrderItem";

    let cols = {
        id: {
            type: dataTypes.STRING(36),
            primaryKey: true
        },
        orders_id: { type: dataTypes.STRING(36) },
        products_id: { type: dataTypes.STRING(36) },
        name: {type: dataTypes.STRING(255)},
        price: { type: dataTypes.INTEGER },
        quantity: {type: dataTypes.INTEGER}
    }

    let config = {
        tableName: 'order_items',
        paranoid: true
    }

    const OrderItem = sequelize.define(alias, cols, config);

    OrderItem.associate = (models) => {
        OrderItem.belongsTo(models.Order, {
            as: 'order',
            foreignKey: 'orders_id'
        });
        OrderItem.belongsTo(models.Product, {
            as: 'product',
            foreignKey: 'products_id'
        });
    };

    return OrderItem;
}