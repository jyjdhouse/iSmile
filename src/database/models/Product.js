module.exports = (sequelize, dataTypes) => {
    let alias = "Product";

    let cols = {
        id: {
            type: dataTypes.STRING(36),
            primaryKey: true,
        },
        name: { type: dataTypes.STRING(255) },
        price: { type: dataTypes.INTEGER },
        description: { type: dataTypes.TEXT },
        category_id: { type: dataTypes.INTEGER },
        stock: { type: dataTypes.INTEGER },
        ingredients: { type: dataTypes.TEXT },
        size: { type: dataTypes.TEXT },
        discount: { type: dataTypes.TINYINT },
    }

    let config = {
        tableName: 'products',
        paranoid: true
    }

    const Product = sequelize.define(alias, cols, config);

    Product.associate = (models) => {
        Product.belongsTo(models.Category, {
            as: 'category',
            foreignKey: 'category_id'
        });
        Product.hasMany(models.ProductFile, {
            as: 'files',
            foreignKey: 'products_id'
        });
       
        Product.hasMany(models.TemporalItem, {
            as: 'temporalItems',
            foreignKey: 'products_id'
        });

        Product.hasMany(models.OrderItem,{
            as: 'orderItems',
            foreignKey: 'products_id'
        })
    };
    return Product;
}