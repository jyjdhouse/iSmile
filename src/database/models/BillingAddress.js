module.exports = (sequelize, dataTypes) => {
    let alias = "BillingAddress";

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
        country: { type: dataTypes.STRING(255) },
    }

    let config = {
        tableName: 'billing_addresses',
        paranoid: true
    }

    const BillingAddress = sequelize.define(alias, cols, config);

    BillingAddress.associate = (models) => {
        BillingAddress.hasOne(models.Order, {
            as: 'order',
            foreignKey: 'billing_addresses_id',
        })
    };

    return BillingAddress;
}