module.exports = (sequelize, dataTypes) => {
    let alias = "Category";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        category: {type: dataTypes.STRING(255)}
    }

    let config = {
        tableName: 'categories',
        paranoid: true,
        timestamps: true,
        updatedAt: false
    }

    const Category = sequelize.define(alias, cols, config);

    Category.associate = (models) => {
        Category.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'category_id'
        });
    };
    return Category;
}