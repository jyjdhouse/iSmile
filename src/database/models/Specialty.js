module.exports = (sequelize, dataTypes) => {
    let alias = "Specialty";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: { type: dataTypes.STRING(255) },
        filename: { type: dataTypes.TEXT },
        
    }

    let config = {
        tableName: 'specialties',
        timestamps: false
    }

    const Specialty = sequelize.define(alias, cols, config);

    Specialty.associate = (models) => {
        Specialty.hasMany(models.SpecialtyService, {
            as: 'services',
            foreignKey: 'specialties_id',
        });
        Specialty.hasMany(models.Treatment, {
            as: 'treatments',
            foreignKey: 'specialties_id',
        })
    };

    return Specialty;
}