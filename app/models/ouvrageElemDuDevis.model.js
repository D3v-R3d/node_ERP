const { DataTypes } = require('sequelize');
const Joi = require("joi");

module.exports = model;

function model(sequelize) {
    const attributes = {
        id : {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        designation: {type: DataTypes.STRING, allowNull: false},
        unite:{type: DataTypes.STRING,},
        proportion: {type:DataTypes.INTEGER},
        prix: {type:DataTypes.FLOAT},
        EntrepriseId: {type:DataTypes.INTEGER},
        quantite: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: false
        },
        remarques:{type: DataTypes.STRING},
        uniteproportionOE: {type:DataTypes.STRING},



    }
    return sequelize.define('OuvrElemDuDevis', attributes);
}