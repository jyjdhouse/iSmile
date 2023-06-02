module.exports = (sequelize, dataTypes) => {
    let alias = "CountryPhoneCode";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        country_name: { type: dataTypes.STRING(255) },
        ISO: {type: dataTypes.STRING(2)},
        code: {type: dataTypes.STRING(10)}
    }

    let config = {
        tableName: 'country_phone_codes',
        timestamps: false
    }

    const CountryPhoneCode = sequelize.define(alias, cols, config);

    return CountryPhoneCode;
}