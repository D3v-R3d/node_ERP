const { DataTypes } = require('sequelize');

module.exports = model;

//Création d'un model de données d'un cout
function model(sequelize){
    const attributes = {
        id : {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        designation: {
            type: DataTypes.STRING,
            allowNull: false
        },
        unite: {
            type: DataTypes.STRING,
            allowNull: false
        },
        prixUnitaire: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        EntrepriseId:{
            type: DataTypes.INTEGER
        },
        TypeCoutId:{
            type: DataTypes.INTEGER
        }

    };

    return  sequelize.define('Cout', attributes );
}
