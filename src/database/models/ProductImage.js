module.exports = (sequelize, dataTypes) => {
    let alias = "Product_Image";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        image: { type: dataTypes.STRING(255) },
        product_id: { type: dataTypes.INTEGER }
    }

    let config = {
        tableName: 'products_images',
        timestamps: false
    }

    const Product_Image = sequelize.define(alias, cols, config);

    Product_Image.associate = (models) => {
        Product_Image.belongsTo(models.Product, {
            as: 'product',
            foreignKey: 'product_id'
        });
    };
    return Product_Image;
}