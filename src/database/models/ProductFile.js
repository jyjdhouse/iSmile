module.exports = (sequelize, dataTypes) => {
    let alias = "ProductFile";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        filename: { type: dataTypes.TEXT },
        products_id: { type: dataTypes.STRING(36) },
        file_types_id: {type: dataTypes.INTEGER}
    }

    let config = {
        tableName: 'products_files',
        timestamps: false
    }

    const ProductFile = sequelize.define(alias, cols, config);

    ProductFile.associate = (models) => {
        ProductFile.belongsTo(models.Product, {
            as: 'product',
            foreignKey: 'products_id'
        });
        ProductFile.belongsTo(models.FileType, {
            as: 'fileType',
            foreignKey: 'file_types_id'
        });
    };
    return ProductFile;
}