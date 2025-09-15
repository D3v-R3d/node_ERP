const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        longueur: {type: DataTypes.INTEGER, allowNull: true},
        largeur: {type: DataTypes.INTEGER, allowNull: true},
        hauteur: {type: DataTypes.INTEGER, allowNull: true},
    };
    // attributes._factory = {autoIncrementField: 'id'}
    // id = ''
    // console.log(attributes._factory  )
    return sequelize.define('Metre', attributes);
}
