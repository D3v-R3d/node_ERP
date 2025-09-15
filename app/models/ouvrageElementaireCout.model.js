

const { DataTypes } = require('sequelize');
const {types} = require("joi");

module.exports = model;

function model(sequelize) {
    const attributes = {
        id : {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        OuvragesElementaireId: {
            type: DataTypes.INTEGER
        },
        CoutId: {
            type: DataTypes.INTEGER
        },
        ratio:{
            type: DataTypes.FLOAT
        },
        uRatio:{
            type:DataTypes.STRING
        }
    };

    return sequelize.define('OuvragesElementairesCouts', attributes);
}
