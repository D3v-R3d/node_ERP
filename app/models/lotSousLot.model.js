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
        SousLotId: {
            type: DataTypes.INTEGER
        },
        LotId: {
            type: DataTypes.INTEGER
        },
    };

    return sequelize.define('LotSousLot', attributes);
}
