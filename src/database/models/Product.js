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
        categories_id: { type: dataTypes.INTEGER }
    }

    let config = {
        tableName: 'products',
        paranoid: true
    }

    const Product = sequelize.define(alias, cols, config);

    Product.associate = (models) => {
        Product.belongsTo(models.Category, {
            as: 'category',
            foreignKey: 'categories_id'
        });
        Product.belongsToMany(models.Color, {
            as: 'colors',
            through: "Product_Color",
            foreignKey: 'products_id',
            otherKey: 'colors_id'
        });
        Product.belongsToMany(models.Keyword, {
            as: 'keywords',
            through: "Keyword_Product",
            foreignKey: 'products_id',
            otherKey: 'keywords_id'
        });
        Product.belongsToMany(models.User, {
            as: 'wishedUsers',
            through: "Wishlist",
            foreignKey: 'products_id',
            otherKey: 'users_id'
        });
        Product.belongsToMany(models.Product, {
            as: 'outfitProducts',
            through: "OutfitProduct",
            foreignKey: 'products_id',
            otherKey: 'outfit_product_id'
        });
        Product.hasMany(models.File,{
            as:'files',
            foreignKey:'products_id'
        });
        Product.hasMany(models.ProductDetail,{
            as:'details',
            foreignKey:'products_id'
        });
        Product.hasMany(models.Stock,{
            as:'stocks',
            foreignKey:'products_id'
        });
    //     // Product.hasMany(models.OrderItem,{
    //     //     as:'orderItems',
    //     //     foreignKey:'products_id'
    //     // }); TODO: Para el carro de compras
    };
    return Product;
}