module.exports = (sequelize, dataTypes) => {
    let alias = "UserAddress";

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
        users_id: { type: dataTypes.STRING(36) }
     
    }

    let config = {
        tableName: 'user_addresses',
        paranoid: true
    }

    const UserAddress = sequelize.define(alias, cols, config);

    UserAddress.associate = (models) => {
        UserAddress.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'users_id',
        });
    }
    return UserAddress;
}