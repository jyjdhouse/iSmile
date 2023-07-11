module.exports = (sequelize, dataTypes) => {
    let alias = "User";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: { type: dataTypes.STRING(255) },
        last_name: { type: dataTypes.STRING(255) },
        phone: { type: dataTypes.STRING(100) },
        dni: { type: dataTypes.STRING(8) },
        password: { type: dataTypes.STRING(255) },
        email: { type: dataTypes.STRING(255) },
        wpp_notifications: { type: dataTypes.TINYINT },
        email_notifications: { type: dataTypes.TINYINT },
        email_newsletter: { type: dataTypes.TINYINT },
        user_categories_id: {type: dataTypes.INTEGER},
        password_token: { type: dataTypes.TEXT }
    }

    let config = {
        tableName: 'users',
        paranoid: true
    }

    const User = sequelize.define(alias, cols, config);

    User.associate = (models) => {
       /*  User.hasMany(models.Wishlist, {
            as: 'wishlistProducts',
            foreignKey: 'users_id',
        }) */
        User.hasOne(models.Address, {
            as: 'address',
            foreignKey: 'user_id',
        });
        User.hasOne(models.TemporalCart, {
            as: 'temporalCart',
            foreignKey: 'user_id',
        });
        User.belongsTo(models.UserCategory,{
            as: 'userCategory',
            foreignKey: 'user_categories_id'
        });
    };

    return User;
}