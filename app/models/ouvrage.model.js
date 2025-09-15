const { DataTypes } = require('sequelize');


module.exports = model;

//Création du model de données d'un ouvrage
function model(sequelize){
    const attributes = {
        designation: {
            type: DataTypes.STRING,
            allowNull: false
        },
        benefice: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        aleas: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        unite: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ratio: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        uRatio: {
            type: DataTypes.STRING,
            allowNull: false
        },
        prix : {
            type : DataTypes.FLOAT
        },
        EntrepriseId:{
            type: DataTypes.INTEGER
        },
    };

    return sequelize.define('Ouvrage', attributes );
};