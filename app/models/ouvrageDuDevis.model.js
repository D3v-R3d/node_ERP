const { DataTypes } = require('sequelize');

module.exports = model;

//Création d'un model de données d'un cout
function model(sequelize){
    const attributes = {
        id : {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        designation:{
            type:DataTypes.STRING
        },
        benefice:{
            type: DataTypes.INTEGER
        },
        aleas: {
            type: DataTypes.INTEGER
        },
        unite: {
            type: DataTypes.STRING
        },
        ratio: {
            type: DataTypes.FLOAT
        },
        uRatio: {
            type:DataTypes.STRING
        },
        prix : {
            type : DataTypes.FLOAT
        },
        EntrepriseId:{
            type: DataTypes.INTEGER
        },
        alteredBenefOrAleas:{
            type: DataTypes.BOOLEAN
        },


    };

    return  sequelize.define('OuvrageDuDevis', attributes );
}
