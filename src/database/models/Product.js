module.exports = (sequelize, dataTypes) => {
    let alias = "Product";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: { type: dataTypes.STRING(255) },
        price: { type: dataTypes.DECIMAL(10, 2) },
        description: { type: dataTypes.TEXT },
        category_id: { type: dataTypes.INTEGER }
    }

    let config = {
        tableName: 'products',
        paranoid: true
    }

    const Product = sequelize.define(alias, cols, config);

    // Product.associate = (models) => {
    //     Product.belongsTo(models.Category, {
    //         as: 'category',
    //         foreignKey: 'categories_id'
    //     });
    //     Product.hasMany(models.Image, {
    //         as: 'images',
    //         foreignKey: 'product_id'
    //     });
    // };
    return Product;
}