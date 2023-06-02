module.exports = (sequelize,dataTypes)=>{
    const alias = 'OutfitProduct';

    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        products_id: {
            type: dataTypes.INTEGER
        },
        colors_id: {
            type: dataTypes.INTEGER
        },
        outfit_product_id: {
            type: dataTypes.INTEGER
        },
        outfit_color_id: {
            type: dataTypes.INTEGER
        },
        
    };

    const config = {
        tableName: 'outfit_products',
        timestamps: false
    };

    const OutfitProduct = sequelize.define(alias,cols,config);
    // OutfitProduct.associate = (models) => {
        
    //     OutfitProduct.belongsToMany(models.Product, {
    //         as: 'products',
    //         through: "OutfitProduct",
    //         foreignKey: 'outfit_product_id',
    //         otherKey: 'products_id'
    //     });
        
    // }
    return OutfitProduct;
}   