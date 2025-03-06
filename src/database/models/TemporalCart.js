module.exports = (sequelize, dataTypes) => {
    let alias = "TemporalCart";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        users_id: { type: dataTypes.STRING(36) }
    }

    let config = {
        tableName: 'temporal_carts',
        timestamps: false
    }

    const TemporalCart = sequelize.define(alias, cols, config);

    TemporalCart.associate = (models) => {
        TemporalCart.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'users_id'
        });
        TemporalCart.hasMany(models.TemporalItem, {
            as: 'temporalItems',
            foreignKey: 'temporal_cart_id'
        });
    };

    return TemporalCart;
}