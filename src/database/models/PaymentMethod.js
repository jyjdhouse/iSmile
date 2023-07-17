module.exports=(sequelize,dataTypes)=>{
    let alias = "PaymentMethod";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        name: {type: dataTypes.STRING(255)}
    }

    let config = {
        tableName:'payment_methods',
        timestamps:false
    }

    const PaymentMethod = sequelize.define(alias,cols,config);

    PaymentMethod.associate = (models)=>{
        PaymentMethod.hasMany(models.Order,{
            as:'orders',
            foreignKey: 'payment_methods_id'
        })
    };

    return PaymentMethod;
}