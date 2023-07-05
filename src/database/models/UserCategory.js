module.exports=(sequelize,dataTypes)=>{
    let alias = "UserCategory";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        name: {type: dataTypes.STRING(45)}
    }

    let config = {
        tableName:'users_categories',
        timestamps:false
    }

    const UserCategory = sequelize.define(alias,cols,config);

    UserCategory.associate = (models)=>{
        UserCategory.hasMany(models.User,{
            as:'users',
            foreignKey: 'user_categories_id'
        })
    };

    return UserCategory;
}