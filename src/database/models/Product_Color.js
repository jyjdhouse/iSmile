module.exports = (sequelize,dataTypes)=>{
    const alias = 'Product_Color';

    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        colors_id: {
            type: dataTypes.INTEGER
        },
        products_id: {
            type: dataTypes.INTEGER
        }
    };

    const config = {
        tableName: 'products_colors',
        timestamps: false
    };

    const Product_Color = sequelize.define(alias,cols,config);

    return Product_Color;
}   