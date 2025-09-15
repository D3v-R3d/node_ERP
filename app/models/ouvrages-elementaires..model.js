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
        unite:{type: DataTypes.STRING},
        remarques:{type: DataTypes.STRING},
        proportion: {type:DataTypes.FLOAT},
        prix: {type:DataTypes.INTEGER},
        uniteproportionOE: {type:DataTypes.STRING},
        EntrepriseId: {type:DataTypes.INTEGER},
    }
    return sequelize.define('OuvragesElementaires', attributes);
}