module.exports = (sequelize, dataTypes) => {
    let alias = "User";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: { type: dataTypes.STRING(255) },
        last_name: { type: dataTypes.STRING(255) },
        email: { type: dataTypes.STRING(255) },
        password: { type: dataTypes.STRING(255) },
        dni: { type: dataTypes.STRING(45) },
        phone_number: { type: dataTypes.STRING(255) },
       /*  notifications: { type: dataTypes.TINYINT },
        last_wishlist_email: { type: dataTypes.DATE },
        last_cart_email: { type: dataTypes.DATE },
        wishlist_period_type: { type: dataTypes.STRING(1) },
        cart_period_type: { type: dataTypes.STRING(1) }, */
        isAdmin: {type: dataTypes.INTEGER}
    }

    let config = {
        tableName: 'USERS',
        paranoid: true
    }

    const User = sequelize.define(alias, cols, config);

    User.associate = (models) => {
       /*  User.hasMany(models.Wishlist, {
            as: 'wishlistProducts',
            foreignKey: 'users_id',
        }) */
        User.hasMany(models.Address, {
            as: 'addresses',
            foreignKey: 'user_id',
        })
    };

    return User;
}