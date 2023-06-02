module.exports = (sequelize,dataTypes)=>{
    const alias = 'Wishlist';

    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        products_id: {
            type: dataTypes.INTEGER
        },
        users_id: {
            type: dataTypes.INTEGER
        },
        colors_id: {
            type: dataTypes.INTEGER
        },
        createdAt: {
            type: dataTypes.DATE
        }
    };

    const config = {
        tableName: 'wishlist_products',
        timestamps: false
    };

    const Wishlist = sequelize.define(alias,cols,config);
    Wishlist.associate = (models) => {
        Wishlist.belongsTo(models.Product, {
            as: 'wishedProduct',
            foreignKey: 'products_id'
        });
        Wishlist.belongsTo(models.User, {
            as: 'wishedUser',
            foreignKey: 'users_id'
        })
        Wishlist.belongsTo(models.Color, {
            as: 'wishedProductColor',
            foreignKey: 'colors_id'
        })
    };
    return Wishlist;
}   