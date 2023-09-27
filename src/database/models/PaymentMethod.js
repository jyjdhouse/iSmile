module.exports = (sequelize, dataTypes) => {
    let alias = "PaymentMethod";

    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true
        },
        name: { type: dataTypes.STRING(150) },
    }

    let config = {
        tableName: 'payment_methods',
        paranoid: false,
        timestamps: false
    }

    const PaymentMethod = sequelize.define(alias, cols, config);

  PaymentMethod.associate = (models) => {
    PaymentMethod.hasMany(models.AcceptedCard, {
        as: 'cards',
        foreignKey: 'payment_method_id'
    });
    };

    return PaymentMethod;
}