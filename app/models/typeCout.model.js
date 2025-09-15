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
        type: {type: DataTypes.STRING, allowNull: false},
        categorie: {type: DataTypes.STRING, allowNull: false},
        EntrepriseId: {type:DataTypes.INTEGER}
    };

    return sequelize.define('TypeCout', attributes);
}
