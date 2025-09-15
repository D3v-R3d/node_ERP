const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const logService = require('../Service/log.service');

// GET /logs
router.get('/', getLogs);

// POST /logs
router.post('/', createLog);

async function getLogs(req, res, next) {
    try {
        const logs = await logService.getLogs();
        res.json(logs);
    } catch (error) {
        next(error);
    }
}

// async function addLog(req, res, next) {
//     try {
//         const logData = req.body
//         await logService.addLog(logData)
//
//     } catch (e) {
//         console.log(e)
//     }
// }

 // await logService.addLog(req.body)
 //        .then(() => res.json({}))
 //        .catch(err => next(err));
// }

async function createLog(req, res, next) {
    if(req.body.method === "GET")
        return res.status(200).json({ message: 'Log non enregistré pour les requêtes GET' });
    try {
        const { level, additional, message, timestamp,statusText,status,url,name,error,duration,method,stack,fileName,lineNumber,functionName,methodName,UserId } = req.body;
        await logService.createLog( level, additional, message, timestamp,statusText,status,url,name,error,duration,method,stack,fileName,lineNumber,functionName,methodName,UserId );
        res.status(201).json({ message: 'Log enregistré avec succès' });
    } catch (error) {
        next(error);
    }
}

module.exports = router;
