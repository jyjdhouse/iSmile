module.exports=(sequelize,dataTypes)=>{
    let alias = "HomeSection";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        name: {type: dataTypes.STRING(45)}
    }

    let config = {
        tableName:'home_sections',
        timestamps:false
    }

    const HomeSection = sequelize.define(alias,cols,config);

    HomeSection.associate = (models)=>{
        HomeSection.hasMany(models.HomeFile,{
            as:'homeFiles',
            foreignKey: 'home_sections_id'
        })
    };

    return HomeSection;
}