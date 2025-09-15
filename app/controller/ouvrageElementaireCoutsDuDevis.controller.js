const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const ouvrageElementaireCoutDuDevisService = require('../Service/ouvrageElementaireCoutDuDevis.service')
const db = require('../_helpers/db');
const {joinSQLFragments} = require("sequelize/lib/utils/join-sql-fragments");



router.post('/new',createSchema, create);
router.post('/newOuvrage',createSchema2, createOuvrageOuvrageElemDuDevis);
router.post('/addOuvrageCout/:OuvrageDuDeviId', createByCout);
router.get('/', getAll )
router.get('/:id', getById)
router.put('/:CoutDuDeviId/:OuvrElemDuDeviId', updateSchema, update )
router.delete('/:CoutDuDeviId/:OuvrageDuDeviId', _delete);

module.exports = router;

function _delete(req, res, next) {
    ouvrageElementaireCoutDuDevisService.deleteByCoutAndOuvrage(req.params)
        .then(ouvrageCout => res.json(ouvrageCout))
        .catch(next);
}

function getAll(req, res, next) {
    ouvrageElementaireCoutDuDevisService.getAll()
        .then(ouvrageCout => res.json(ouvrageCout))
        .catch(next);
}

function getById(req, res, next) {
    ouvrageElementaireCoutDuDevisService.getById(req.params.id)
        .then(ouvrageCout => res.json(ouvrageCout))
        .catch(next);
}


function create (req, res, next) {
    console.log("REQ OUVRAGEELEMCOUT---------------------------------------------------------------",req.body)
    ouvrageElementaireCoutDuDevisService.create(req.body)
        .then(() => res.json({
            message: 'Ouv elementaire ajouter à l ouvrage du devis',
            ouvrageCout: req.body
        }))
        .catch(next);
}


function createOuvrageOuvrageElemDuDevis (req, res, next) {
    console.log("REQ OUVRAGEouvrage---------------------------------------------------------------",req.body)
    ouvrageElementaireCoutDuDevisService.createOuvrageElemOuvrageDuDevis(req.body)
        .then(() => res.json({
            message: 'Ouv elementaire ajouter à l ouvrage du devis',
            ouvrageCout: req.body
        }))
        .catch(next);
}
function createByCout (req, res, next) {
    console.log("REQ.BODY",req.body)
    ouvrageElementaireCoutDuDevisService.createByCout(req.params,req.body)
        .then(() => res.json({
            message: 'Cout ajouter à l ouvrage',
            ouvrageCout: req.body
        }))
        .catch(next);
}

function update (req, res, next) {
    console.log('PARAMS', req.params)
    console.log('BODY', req.body)
    ouvrageElementaireCoutDuDevisService.update(req.params, req.body)
        .then(() => res.json({
            message: 'Cout ajouter à l ouvrage',
            ouvrageElemCout: req.body
        }))
        .catch(next);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        OuvrElemDuDeviId: Joi.number(),
        CoutDuDeviId: Joi.number(),
        ratio: Joi.number(),
        uRatio: Joi.string(),
        efficience: Joi.number()

    });
    validateRequest(req, next, schema);
}
function createSchema2(req, res, next) {
    const schema = Joi.object({
        OuvrElemDuDeviId: Joi.number(),
        OuvrageDuDeviId: Joi.number(),
        ratio: Joi.number(),
        uRatio: Joi.string(),
        efficience: Joi.number()

    });
    validateRequest(req, next, schema);
}
function updateSchema(req, res, next) {
    const schema = Joi.object({
        OuvrElemDuDeviId: Joi.number(),
        CoutDuDeviId: Joi.number(),
        ratio: Joi.number(),
        uRatio: Joi.string(),
        efficience: Joi.number()

    });
    validateRequest(req, next, schema);
}