module.exports = (sequelize, dataTypes) => {
    let alias = "File";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        filename: { type: dataTypes.TEXT },
        file_types_id: {type: dataTypes.INTEGER},
        colors_id: {type: dataTypes.INTEGER},
        products_id: {type: dataTypes.INTEGER}
    }

    let config = {
        tableName: 'files',
        timestamps: false
    }

    const File = sequelize.define(alias, cols, config);

    File.associate = (models) => {
        File.belongsTo(models.Color,{
            as:'color',
            foreignKey: 'colors_id'
        });
        File.belongsTo(models.FileType,{
            as: 'fileType',
            foreignKey: 'file_types_id'
        });
        File.belongsTo(models.Product,{
            as: 'product',
            foreignKey: 'products_id'
        });
    };

    return File;
}