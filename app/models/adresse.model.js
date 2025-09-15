const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        adresses: {type: DataTypes.STRING, allowNull: true},
        zipcode: {type: DataTypes.INTEGER, allowNull: true},
        city: {type: DataTypes.STRING, allowNull: true},
        country: {type: DataTypes.STRING, allowNull: true},


        ClientId:{type:DataTypes.INTEGER},

    };
    // attributes._factory = {autoIncrementField: 'id'}
    // id = ''
    // console.log(attributes._factory  )
    return sequelize.define('Adresse', attributes);
}
