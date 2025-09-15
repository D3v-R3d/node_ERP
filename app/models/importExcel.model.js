const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        title: {type: DataTypes.STRING,},
        data: {type: DataTypes.JSON, allowNull: false},
    };

    return sequelize.define('ImportExcel', attributes);
}