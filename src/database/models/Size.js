module.exports = (sequelize, dataTypes) => {
    let alias = "Size";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: { type: dataTypes.STRING(45) }
    }

    let config = {
        tableName: 'sizes',
        timestamps: false
    }

    const Size = sequelize.define(alias, cols, config);
    Size.associate = (models)=>{
        Size.hasMany(models.Stock,{
            as:'stocks',
            foreignKey: 'sizes_id'
        })
    }
    return Size;
}