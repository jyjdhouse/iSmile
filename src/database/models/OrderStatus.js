module.exports=(sequelize,dataTypes)=>{
    let alias = "OrderStatus";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        status: {type: dataTypes.STRING(45)}
    }

    let config = {
        tableName:'order_status',
        timestamps:false
    }

    const OrderStatus = sequelize.define(alias,cols,config);

    OrderStatus.associate = (models)=>{
        OrderStatus.hasMany(models.Order,{
            as:'orders',
            foreignKey: 'order_status_id'
        })
    };

    return OrderStatus;
}