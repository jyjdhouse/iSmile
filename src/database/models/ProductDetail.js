module.exports=(sequelize,dataTypes)=>{
    let alias = "ProductDetail";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        detail: {type: dataTypes.TEXT},
        products_id: {type: dataTypes.INTEGER}
    }

    let config = {
        tableName:'product_details',
        timestamps:false
    }

    const ProductDetail = sequelize.define(alias,cols,config);

    ProductDetail.associate = (models)=>{
        ProductDetail.belongsTo(models.Product,{
            as:'product',
            foreignKey: 'products_id'
        })
    };

    return ProductDetail;
}