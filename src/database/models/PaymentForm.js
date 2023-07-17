module.exports=(sequelize,dataTypes)=>{
    let alias = "PaymentForm";

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

    const PaymentForm = sequelize.define(alias,cols,config);

    PaymentForm.associate = (models)=>{
       /*  PaymentForm.hasMany(models.Order,{
            as:'orders',
            foreignKey: 'order_types_id'
        }) */
    };

    return PaymentForm;
}