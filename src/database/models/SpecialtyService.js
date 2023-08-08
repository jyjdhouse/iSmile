module.exports = (sequelize, dataTypes) => {
    let alias = "SpecialtyService";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: { type: dataTypes.STRING(255) },
        description: { type: dataTypes.TEXT },
        specialties_id: { type: dataTypes.INTEGER },
        filename: { type: dataTypes.TEXT },
        
    }

    let config = {
        tableName: 'specialties_services',
        timestamps: false
    }

    const SpecialtyService = sequelize.define(alias, cols, config);

    SpecialtyService.associate = (models) => {
        SpecialtyService.belongsTo(models.Specialty, {
            as: 'specialty',
            foreignKey: 'specialties_id',
        })
        SpecialtyService.hasMany(models.Treatment, {
            as: 'treatments',
            foreignKey: 'specialties_services_id',
        })
    };

    return SpecialtyService;
}