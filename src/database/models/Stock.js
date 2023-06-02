module.exports = (sequelize, dataTypes) => {
    let alias = "Stock";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        products_id: { type: dataTypes.INTEGER },
        colors_id: { type: dataTypes.INTEGER },
        sizes_id: { type: dataTypes.INTEGER },
        quantity: { type: dataTypes.INTEGER }
    }

    let config = {
        tableName: 'stock',
        timestamps: false
    }

    const Stock = sequelize.define(alias, cols, config);
    Stock.associate = (models) => {
        Stock.belongsTo(models.Product, {
            as: 'product',
            foreignKey: 'products_id'
        });
        Stock.belongsTo(models.Color, {
            as: 'color',
            foreignKey: 'colors_id'
        });
        Stock.belongsTo(models.Size, {
            as: 'size',
            foreignKey: 'sizes_id'
        });
    }
    return Stock;
}