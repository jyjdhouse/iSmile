module.exports = (sequelize, dataTypes) => {
    let alias = "Color";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: { type: dataTypes.STRING(255) },
        code: {type: dataTypes.STRING(10)}
    }

    let config = {
        tableName: 'colors',
        timestamps: false
    }

    const Color = sequelize.define(alias, cols, config);

    Color.associate = (models) => {
        Color.belongsToMany(models.Product, {
            as: 'products',
            through: 'Product_Color',
            foreignKey: 'colors_id',
            otherKey: 'products_id'
        });
        Color.hasMany(models.Wishlist, {
            as: 'wishedProducts',
            foreignKey: 'colors_id'
        });
        Color.hasMany(models.Stock,{
            as:'stocks',
            foreignKey:'colors_id'
        });
    };

    return Color;
}