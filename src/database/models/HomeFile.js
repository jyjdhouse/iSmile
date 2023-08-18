module.exports = (sequelize, dataTypes) => {
    let alias = "HomeFile";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        filename: { type: dataTypes.TEXT },
        file_types_id: { type: dataTypes.INTEGER},
        home_sections_id: { type: dataTypes.INTEGER },
        position: { type: dataTypes.INTEGER},
        label: { type: dataTypes.TEXT }
    }

    let config = {
        tableName: 'home_files',
        timestamps: false
    }

    const HomeFile = sequelize.define(alias, cols, config);

    HomeFile.associate = (models) => {
        HomeFile.belongsTo(models.HomeSection, {
            as: 'homeSection',
            foreignKey: 'home_sections_id'
        });
        HomeFile.belongsTo(models.FileType, {
            as: 'fileType',
            foreignKey: 'file_types_id'
        });
    };
    return HomeFile;
}