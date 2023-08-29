module.exports = (sequelize, dataTypes) => {
    let alias = "User";

    let cols = {
        id: {
            type: dataTypes.STRING(36),
            primaryKey: true,
        },
        first_name: { type: dataTypes.STRING(255) },
        last_name: { type: dataTypes.STRING(255) },
        birth_date: { type: dataTypes.DATE },
        genres_id: { type: dataTypes.INTEGER },
        phone: { type: dataTypes.STRING(100) },
        dni: { type: dataTypes.STRING(8) },
        password: { type: dataTypes.STRING(255) },
        email: { type: dataTypes.STRING(255) },
        wpp_notifications: { type: dataTypes.TINYINT },
        email_notifications: { type: dataTypes.TINYINT },
        email_newsletter: { type: dataTypes.TINYINT },
        user_categories_id: { type: dataTypes.INTEGER },
        password_token: { type: dataTypes.TEXT },
        last_cart_email: { type: dataTypes.DATE },
        cart_period_type: { type: dataTypes.STRING(1) },
        country_codes_id: { type: dataTypes.INTEGER },
        verified_email: { type: dataTypes.TINYINT },
        verification_code: { type: dataTypes.STRING(6) },
        expiration_time: { type: dataTypes.DATE }
    }

    let config = {
        tableName: 'users',
        paranoid: true
    }

    const User = sequelize.define(alias, cols, config);

    User.associate = (models) => {
        User.belongsTo(models.Genre, {
            as: 'genre',
            foreignKey: 'genres_id',
        })
        User.hasOne(models.UserAddress, {
            as: 'userAddress',
            foreignKey: 'users_id',
        });
        User.hasOne(models.TemporalCart, {
            as: 'temporalCart',
            foreignKey: 'users_id',
        });
        User.belongsTo(models.UserCategory, {
            as: 'userCategory',
            foreignKey: 'user_categories_id'
        });
    };

    return User;
}