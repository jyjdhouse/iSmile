module.exports=(sequelize,dataTypes)=>{
    let alias = "FileType";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        type: {type: dataTypes.STRING(45)}
    }

    let config = {
        tableName:'file_types',
        timestamps:false
    }

    const FileType = sequelize.define(alias,cols,config);

    FileType.associate = (models)=>{
        FileType.hasMany(models.ProductFile,{
            as:'productFiles',
            foreignKey: 'file_types_id'
        });
        FileType.hasMany(models.BlogImage,{
            as:'blogFiles',
            foreignKey: 'file_types_id'
        })
    };

    return FileType;
}