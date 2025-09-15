const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        firstName: {type: DataTypes.STRING, allowNull: true},
        lastName: {type: DataTypes.STRING, allowNull: true},
        denomination: {type: DataTypes.STRING, allowNull: false},
        email: {type: DataTypes.STRING, allowNull: true},
        phonenumber: {type: DataTypes.INTEGER, allowNull: true},
        type: {type: DataTypes.STRING, allowNull: false},
        tvaintra:{type: DataTypes.INTEGER,},
        siret:{type: DataTypes.INTEGER},
        // AdresseId:{type:DataTypes.INTEGER},
        EntrepriseId:{
            type: DataTypes.INTEGER
        },
    };

    return sequelize.define('Client', attributes);
}
