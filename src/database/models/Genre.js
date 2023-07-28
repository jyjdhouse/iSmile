module.exports = (sequelize, dataTypes) => {
    let alias = "Genre";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: { type: dataTypes.STRING(45) }
    }

    let config = {
        tableName: 'genres',
        timestamps: false
    }

    const Genre = sequelize.define(alias, cols, config);

    Genre.associate = (models) => {
       Genre.hasMany(models.User, {
            as: 'users',
            foreignKey: 'genres_id',
        }) 
    };

    return Genre;
}