module.exports = (sequelize,dataTypes)=>{
    const alias = 'Keyword_Product';

    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        products_id: {
            type: dataTypes.INTEGER
        },
        keywords_id: {
            type: dataTypes.INTEGER
        }
    };

    const config = {
        tableName: 'keywords_products',
        timestamps: false
    };

    const Keyword_Product = sequelize.define(alias,cols,config);

    return Keyword_Product;
}   