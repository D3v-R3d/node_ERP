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
        OuvrageDuDeviId: {
            type: DataTypes.INTEGER
        },
        SousLotId: {
            type: DataTypes.INTEGER
        },
        quantityOuvrage:{
            type: DataTypes.FLOAT,
            defaultValue: 1
        },
        prixOuvrage:{
            type:DataTypes.FLOAT,
            defaultValue :0
        },
        prixUniVenteHT:{
            type:DataTypes.FLOAT,
            defaultValue: 0
        }
    };

    return sequelize.define('SousLotOuvrage', attributes);
}
