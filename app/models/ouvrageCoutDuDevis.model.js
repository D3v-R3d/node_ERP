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
        OuvrageDuDeviId:{
            type:DataTypes.INTEGER
        },
        CoutDuDeviId:{
            type: DataTypes.INTEGER
        },
        ratio:{
            type: DataTypes.FLOAT
        },
        efficience:{
          type:DataTypes.INTEGER,
          defaultValue:1
        },
        uRatio:{
            type:DataTypes.STRING
        }

    };

    return  sequelize.define('OuvrageCoutDuDevis', attributes );
}
