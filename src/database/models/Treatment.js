module.exports = (sequelize, dataTypes) => {
    let alias = "Treatment";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: { type: dataTypes.STRING(255) },
        description: { type: dataTypes.TEXT },
        specialties_id: { type: dataTypes.INTEGER },
        specialties_services_id: { type: dataTypes.INTEGER },
        price: { type: dataTypes.INTEGER },
        cash_price: { type: dataTypes.INTEGER },
        application_time: { type: dataTypes.TEXT },
        duration: { type: dataTypes.TEXT },
        file_url: {type: dataTypes.TEXT}
    }

    let config = {
        tableName: 'treatments',
        timestamps: false
    }

    const Treatment = sequelize.define(alias, cols, config);

    Treatment.associate = (models) => {
        Treatment.belongsTo(models.Specialty, {
            as: 'specialty',
            foreignKey: 'specialties_id',
        })
        Treatment.belongsTo(models.SpecialtyService, {
            as: 'specialtyService',
            foreignKey: 'specialties_services_id',
        })
    };

    return Treatment;
}