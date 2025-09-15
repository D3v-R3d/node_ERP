const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const ouvrageDuDevisService = require('../Service/ouvrageDuDevis.service')
const db = require("../_helpers/db");

// routes
router.get('/', getAll);
router.put('/:id', updateSchema, update);
router.get('/:id', getById);
router.post('/new', createSchema, create);
router.post('/sousLot',createSousLotOuvrages);
router.delete('/:id', _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
    ouvrageDuDevisService.getAll()
        .then(coutDuDevis => res.json(coutDuDevis))
        .catch(next);
}

function getById(req, res, next) {
    ouvrageDuDevisService.getById(req.params.id)
        .then(coutDuDevis => res.json(coutDuDevis))
        .catch(next);
}

function create(req, res, next) {
    console.log("ouvrage du devis controller create req.body : ",req.body)
    ouvrageDuDevisService.create(req.body)
        .then((createdOuvrageDuDevis) => res.send({
            message: 'ouvrageDuDevis créer',
            OuvrageDuDevis: createdOuvrageDuDevis
        }))
        .catch(next);
}

function update(req, res, next) {
    console.log("req.params",req.params.id)
    console.log("req.body",req.body)
    ouvrageDuDevisService.update(req.params.id, req.body)
        .then(() => res.send({
            message: 'ouvrageDuDevis modifier',
            coutDuDevis: res.body
        }))
        .catch(next);
}

function _delete(req, res, next) {
    ouvrageDuDevisService.delete(req.params.id)
        .then(() => res.send({
            message: 'ouvrageDuDevis effacer',
            coutDuDevis: res.body

        }))
        .catch(next);
}

function createSousLotOuvrages(req, res, next)
{
    console.log("ouvrage du devis controller create sous lot ouvrage", req.body)
    ouvrageDuDevisService.createSousLotOuvrage(req.body)
        .then(ouvrage=>res.send(ouvrage))
        .catch(next)
}

// schema functions

function createSchema(req, res, next) {
    const schema = Joi.object({
        CoutDuDeviId:Joi.number(),
        designation: Joi.string(),
        benefice:Joi.number(),
        aleas: Joi.number(),
        unite: Joi.string(),
        ratio: Joi.number(),
        uRatio: Joi.string(),
        prix : Joi.number(),
        EntrepriseId:Joi.number(),
        alteredBenefOrAleas:Joi.boolean(),


    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        CoutDuDeviId:Joi.number(),
        designation: Joi.string(),
        benefice:Joi.number(),
        aleas: Joi.number(),
        unite: Joi.string(),
        ratio: Joi.number(),
        prix : Joi.number(),
        uRatio: Joi.string(),
        alteredBenefOrAleas:Joi.boolean(),
    })
    validateRequest(req, next, schema);
}
