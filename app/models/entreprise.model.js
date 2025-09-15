const {DataTypes} = require('sequelize');
module.exports = model;
function model(sequelize) {
    const attributes = {
        commercialName: {type: DataTypes.STRING, allowNull: true,defaultValue: null},
        denomination: {type: DataTypes.STRING, allowNull: false},
        formeJuridique: {type: DataTypes.STRING, allowNull: true,defaultValue: null},
        rcs: {type: DataTypes.STRING, allowNull: true,defaultValue: null},
        siret: {type: DataTypes.STRING, allowNull: true,defaultValue: null},
        nafCode: {type: DataTypes.STRING, allowNull: true,defaultValue: null},
        tvaNumber: {type: DataTypes.STRING, allowNull: true,defaultValue: null},
        capital: {type: DataTypes.STRING, allowNull: true,defaultValue: null},
        email: {type: DataTypes.STRING, allowNull: true,defaultValue: null},
        phoneNumber: {type: DataTypes.INTEGER, allowNull: true},
        logo: { type: DataTypes.BLOB('long'), allowNull: true },
        AdresseId: {type: DataTypes.INTEGER}
    };

    return sequelize.define('Entreprise', attributes);
}
