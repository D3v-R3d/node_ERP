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
        CoutId: {
            type: DataTypes.INTEGER
        },
        FournisseurId: {
            type: DataTypes.INTEGER
        }
    };

    return sequelize.define('fournisseurCout', attributes);
}
