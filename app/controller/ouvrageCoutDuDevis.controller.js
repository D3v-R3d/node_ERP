const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const ouvrageCoutDuDevisService = require('../Service/ouvrageCoutDuDevis.service')
const db = require('../_helpers/db');
const {joinSQLFragments} = require("sequelize/lib/utils/join-sql-fragments");



router.post('/new',createSchema, create);
router.post('/addOuvrageCout/:OuvrageDuDeviId', createByCout);
router.get('/', getAll )
router.get('/:id', getById)
router.put('/:CoutDuDeviId/:OuvrageDuDeviId', updateSchema, update )
router.delete('/:CoutDuDeviId/:OuvrageDuDeviId', _delete);

module.exports = router;

function _delete(req, res, next) {
    ouvrageCoutDuDevisService.deleteByCoutAndOuvrage(req.params)
        .then(ouvrageCout => res.json(ouvrageCout))
        .catch(next);
}

function getAll(req, res, next) {
    ouvrageCoutDuDevisService.getAll()
        .then(ouvrageCout => res.json(ouvrageCout))
        .catch(next);
}

function getById(req, res, next) {
    ouvrageCoutDuDevisService.getById(req.params.id)
        .then(ouvrageCout => res.json(ouvrageCout))
        .catch(next);
}


function create (req, res, next) {
    ouvrageCoutDuDevisService.create(req.body)
        .then(() => res.json({
            message: 'Cout ajouter à l ouvrage',
            ouvrageCout: req.body
        }))
        .catch(next);
}
function createByCout (req, res, next) {
    console.log("REQ.BODY",req.body)
    ouvrageCoutDuDevisService.createByCout(req.params,req.body)
        .then(() => res.json({
            message: 'Cout ajouter à l ouvrage',
            ouvrageCout: req.body
        }))
        .catch(next);
}

function update (req, res, next) {
    console.log('PARAMS', req.params)
    console.log('BODY', req.body)
    ouvrageCoutDuDevisService.update(req.params, req.body)
        .then(() => res.json({
            message: 'Cout ajouter à l ouvrage',
            ouvrageCout: req.body
        }))
        .catch(next);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        OuvrageDuDeviId: Joi.number(),
        CoutDuDeviId: Joi.number(),
        ratio: Joi.number(),
        uRatio: Joi.string(),
        efficience: Joi.number()
    });
    validateRequest(req, next, schema);
}
function updateSchema(req, res, next) {
    const schema = Joi.object({
        OuvrageDuDeviId: Joi.number(),
        CoutDuDeviId: Joi.number(),
        ratio: Joi.number(),
        uRatio: Joi.string(),
        efficience: Joi.number()
    });
    validateRequest(req, next, schema);
}