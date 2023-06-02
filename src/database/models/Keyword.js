module.exports = (sequelize, dataTypes) => {
    let alias = "Keyword";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: { type: dataTypes.STRING(255) }
    }

    let config = {
        tableName: 'keywords',
        timestamps: false
    }

    const Keyword = sequelize.define(alias, cols, config);

    Keyword.associate = (models) => {
        Keyword.belongsToMany(models.Product, {
            as: 'products',
            through: 'Keyword_Product',
            foreignKey: 'keywords_id',
            otherKey: 'products_id'
        });
    };

    return Keyword;
}