module.exports = (sequelize, dataTypes) => {
    let alias = "TemporalItem";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        temporal_cart_id: { type: dataTypes.INTEGER },
        product_id: { type: dataTypes.INTEGER },
        quantity: { type: dataTypes.INTEGER }
    }

    let config = {
        tableName: 'temporal_items',
        timestamps: false
    }

    const TemporalItem = sequelize.define(alias, cols, config);

    TemporalItem.associate = (models) => {
        TemporalItem.belongsTo(models.Product, {
            as: 'product',
            foreignKey: 'product_id'
        });
        TemporalItem.belongsTo(models.TemporalCart, {
            as: 'temporalCart',
            foreignKey: 'temporal_cart_id'
        });
    };

    return TemporalItem;
}