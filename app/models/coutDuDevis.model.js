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
        type:{
            type:DataTypes.STRING
        },
        categorie:{
            type: DataTypes.STRING
        },
        designation: {
            type: DataTypes.STRING
        },
        unite: {
            type: DataTypes.STRING
        },
        prixUnitaire: {
            type: DataTypes.FLOAT
        },
        fournisseur: {type:DataTypes.STRING},
        remarque: {type:DataTypes.STRING, allowNull:true}

    };

    return  sequelize.define('CoutDuDevis', attributes );
}
