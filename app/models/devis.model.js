const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        name: {type: DataTypes.STRING, allowNull: false},
        status:{type: DataTypes.STRING, allowNull: false},
        ClientId: {type:DataTypes.INTEGER},
        EntrepriseId: {type:DataTypes.INTEGER},
        // UserId: {type:DataTypes.INTEGER},

        percentFraisGeneraux:{type:DataTypes.FLOAT, defaultValue:20},
        fraisGeneraux:{type:DataTypes.FLOAT, defaultValue:0},
        coutTotal:{type:DataTypes.FLOAT, defaultValue:0},
        debourseSecTotal:{type:DataTypes.FLOAT, defaultValue:0},
        totalDepense:{type:DataTypes.FLOAT, defaultValue:0},
        moyenneBenefice:{type:DataTypes.FLOAT, defaultValue:0},
        moyenneAleas:{type:DataTypes.FLOAT, defaultValue:0},
        moyenneBeneficeAleas:{type:DataTypes.FLOAT, defaultValue:0},
        coeffEquilibre:{type:DataTypes.FLOAT, defaultValue:0},
        prixEquiHT:{type:DataTypes.FLOAT, defaultValue:0},
        beneficeInEuro:{type:DataTypes.FLOAT, defaultValue:0},
        aleasInEuro:{type:DataTypes.FLOAT, defaultValue:0},
        prixCalcHT:{type:DataTypes.FLOAT, defaultValue:0},
        prixVenteHT:{type:DataTypes.FLOAT, defaultValue:0},
        beneficeAleasTotal:{type:DataTypes.FLOAT, defaultValue:0},
        validityTime:{type:DataTypes.INTEGER, defaultValue:90},
        beneficeInPercent:{type:DataTypes.INTEGER},
        aleasInPercent:{type:DataTypes.INTEGER },

    };

    return sequelize.define('Devis', attributes);
}
