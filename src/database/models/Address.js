module.exports = (sequelize, dataTypes) => {
    let alias = "Address";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        street: { type: dataTypes.STRING(255) },
        apartment: { type: dataTypes.STRING(45) },
        city: { type: dataTypes.STRING(100) },
        provinces_id: { type: dataTypes.INTEGER },
        zip_code: { type: dataTypes.STRING(10) },
        users_id: { type: dataTypes.STRING(36) },
     
    }

    let config = {
        tableName: 'addresses',
        paranoid: true
    }

    const Address = sequelize.define(alias, cols, config);

    Address.associate = (models) => {
       /*  Address.hasMany(models.Wishlist, {
            as: 'wishlistProducts',
            foreignKey: 'Addresss_id',
        }) */
        Address.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'users_id',
        })
    };

    return Address;
}