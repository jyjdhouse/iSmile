module.exports = (sequelize, dataTypes) => {
    let alias = "AcceptedCard";

    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true
        },
        name: { type: dataTypes.STRING(150) },
        decidir_id: {type: dataTypes.INTEGER(11)},
        img_src: {type: dataTypes.STRING(100)},
        payment_method_id: {type: dataTypes.INTEGER(11)}
    }

    let config = {
        tableName: 'accepted_cards',
        paranoid: false,
        timestamps: false
    }

    const AcceptedCard = sequelize.define(alias, cols, config);

  AcceptedCard.associate = (models) => {
    AcceptedCard.belongsTo(models.PaymentMethod, {
        as: 'method',
        foreignKey: 'payment_method_id'
    });
    };

    return AcceptedCard;
}