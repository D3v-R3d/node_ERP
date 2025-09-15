const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        level: {type: DataTypes.STRING},
        additional: {type: DataTypes.JSON},
        message: {type: DataTypes.STRING},
        timestamp: {type: DataTypes.DATE},
        statusText:{type: DataTypes.STRING},
        status:{type: DataTypes.STRING},
        url:{type: DataTypes.STRING},
        name:{type: DataTypes.STRING},
        error:{type: DataTypes.STRING},
        duration:{type: DataTypes.STRING},
        method:{type: DataTypes.JSON},
        stack:{type: DataTypes.JSON},
        fileName: { type: DataTypes.STRING },
        lineNumber: { type: DataTypes.INTEGER },
        functionName: { type: DataTypes.STRING },
        methodName: { type: DataTypes.STRING },
        UserId: { type: DataTypes.STRING }


        // level: { type: DataTypes.STRING },
        // message: { type: DataTypes.STRING },
        // timestamp: { type: DataTypes.DATE },
        // url: { type: DataTypes.STRING },
        // method: { type: DataTypes.STRING },
        // requestBody: { type: DataTypes.JSON },
        // requestHeaders: { type: DataTypes.JSON },
        // responseBody: { type: DataTypes.JSON },
        // responseHeaders: { type: DataTypes.JSON },
        // fileName: { type: DataTypes.STRING },
        // lineNumber: { type: DataTypes.INTEGER },
        // functionName: { type: DataTypes.STRING },
        // status: { type: DataTypes.INTEGER },
        // statusText: { type: DataTypes.STRING },
        // errorName: { type: DataTypes.STRING },
        // methodName: { type: DataTypes.STRING }

    };

    return sequelize.define('Log', attributes);
}
