

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

        ratio:{
            type: DataTypes.FLOAT
        },
        efficience:{
            type:DataTypes.INTEGER,
            defaultValue:1
        },
        uRatio:{
            type:DataTypes.STRING
        }

    };

    return sequelize.define('OuvrElemCoutsDuDevis', attributes);
}
