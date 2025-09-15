const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        OuvrageDuDeviId:{ type:DataTypes.INTEGER},
        OuvrElemDuDeviId:{ type:DataTypes.INTEGER},

    };

    return sequelize.define('OuvrOuvrElemDuDevis', attributes);
}
