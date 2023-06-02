module.exports=(sequelize,dataTypes)=>{
    let alias = "FileType";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        name: {type: dataTypes.STRING(255)}
    }

    let config = {
        tableName:'file_types',
        timestamps:false
    }

    const FileType = sequelize.define(alias,cols,config);

    FileType.associate = (models)=>{
        FileType.hasMany(models.File,{
            as:'files',
            foreignKey: 'file_types_id'
        })
    };

    return FileType;
}