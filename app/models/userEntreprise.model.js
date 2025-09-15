const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id : {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        UserId: {
            type: DataTypes.INTEGER
        },
        EntrepriseId: {
            type:DataTypes.INTEGER
        }
    };

    return sequelize.define('UserEntreprise', attributes);
}
