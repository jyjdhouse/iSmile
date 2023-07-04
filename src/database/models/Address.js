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
        user_id: { type: dataTypes.INTEGER },
     
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
            foreignKey: 'user_id',
        })
    };

    return Address;
}