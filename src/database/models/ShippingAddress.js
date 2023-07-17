module.exports = (sequelize, dataTypes) => {
    let alias = "ShippingAddress";

    let cols = {
        id: {
            type: dataTypes.STRING(36),
            primaryKey: true
        },
        street: { type: dataTypes.STRING(255) },
        apartment: { type: dataTypes.STRING(45) },
        city: { type: dataTypes.STRING(100) },
        provinces_id: { type: dataTypes.INTEGER },
        zip_code: { type: dataTypes.STRING(10) },
        users_id: { type: dataTypes.STRING(36) },
        country: { type: dataTypes.STRING(255) },
     
    }

    let config = {
        tableName: 'shipping_addresses',
        paranoid: true
    }

    const ShippingAddress = sequelize.define(alias, cols, config);

    ShippingAddress.associate = (models) => {
        ShippingAddress.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'users_id',
        })
    };

    return ShippingAddress;
}