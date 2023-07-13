module.exports=(sequelize,dataTypes)=>{
    let alias = "OrderType";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        type: {type: dataTypes.STRING(45)}
    }

    let config = {
        tableName:'order_types',
        timestamps:false
    }

    const OrderType = sequelize.define(alias,cols,config);

    OrderType.associate = (models)=>{
        OrderType.hasMany(models.Order,{
            as:'orders',
            foreignKey: 'order_types_id'
        })
    };

    return OrderType;
}