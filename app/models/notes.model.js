const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        title: {type: DataTypes.STRING, allowNull: false},
        text: {type: DataTypes.STRING, allowNull: false},
        typeError: {type: DataTypes.STRING, allowNull: false},
        optionsTypeError: {type: DataTypes.STRING, allowNull: true},
        optionsTimestamp: {type: DataTypes.DATE, allowNull: true},
        resolution: {type: DataTypes.BOOLEAN, allowNull: true},

    };

    return sequelize.define('Notes', attributes);
}
