const db = require('../_helpers/db');

async function createLog(level, additional, message, timestamp,statusText,status,url,name,error,duration,method,stack,fileName,lineNumber,functionName,methodName,UserId) {
    try {
        await db.Logs.create({
            level: level,
            additional: additional,
            message: message,
            timestamp: timestamp,
            statusText:statusText,
            status:status,
            url:url,
            name:name,
            error:error,
            duration:duration,
            method:method,
            stack:stack,
            fileName:fileName,
            lineNumber:lineNumber,
            functionName:functionName,
            methodName:methodName,
            UserId:UserId,

        });
    } catch (error) {
        console.error(`Error while creating log: ${error.message}`);
        throw error;
    }
}

async function addLog(logData) {
    try {
        await  db.Logs.create(logData)
    }catch (e) {
        console.error(`Error while creating log: ${e.message}`);
        throw e;

    }


    // const log = new db.Logs(logData);
    // await log.save();
}

async function getLogs() {
    try {
        return await db.Logs.findAll();
    } catch (error) {
        console.error(`Error while getting logs: ${error.message}`);
        throw error;
    }
}

module.exports = {
    // createLog,
    getLogs,
    addLog,
    createLog
};
