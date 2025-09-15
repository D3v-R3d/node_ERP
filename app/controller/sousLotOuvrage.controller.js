const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const sousLotOuvrageService = require('../Service/sousLotOuvrage.service')
const db = require('../_helpers/db');

//
router.post('/new',createSchema, create);
router.delete('/:OuvrageId/:SousLotId', _delete);
router.get('/', getAll )
router.get('/:id', getById )
router.get('/sum/:id', getSum )
router.put('/:id', updateSchema, update)

module.exports = router;

function getAll(req, res, next) {
    sousLotOuvrageService.getAll()
        .then(sousLotOuvrage => res.json(sousLotOuvrage))
        .catch(next);
}
function getSum(req, res, next) {
    sousLotOuvrageService.getSum(req.params.id)
        .then(sousLotOuvrage => res.json(sousLotOuvrage))
        .catch(next);
}
function getById(req, res, next) {
    sousLotOuvrageService.getById(req.params.id)
        .then(sousLotOuvrage => res.json(sousLotOuvrage))
        .catch(next);
}

function _delete(req, res, next) {
    sousLotOuvrageService.deleteByOuvrageAndSousLot(req.params)
        .then(sousLotOuvrage => res.json(sousLotOuvrage))
        .catch(next);
}
function update(req, res, next) {
    sousLotOuvrageService.update(req.params.id, req.body)
        .then(() => res.send({
            message: 'sousLotOuvrage update',
            cout: req.body
        }))
        .catch(next);
}

function create (req, res, next) {
    console.log("create sous lot ouvrage ", req.body)
    sousLotOuvrageService.create(req.body)
        .then(sousLotOuvrage => res.json({
            message: 'ouvrage ajouter au sous lot',
            sousLotOuvrage: sousLotOuvrage
        }))
        .catch(next);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        OuvrageDuDeviId: Joi.number(),
        SousLotId: Joi.number(),
        quantityOuvrage: Joi.number(),
        prixOuvrage: Joi.number(),
        prixUniVenteHT: Joi.number()
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next){
    const schema = Joi.object({
        OuvrageDuDeviId: Joi.number(),
        SousLotId: Joi.number(),
        quantityOuvrage: Joi.number(),
        prixOuvrage: Joi.number(),
        prixUniVenteHT: Joi.number()

    })
    validateRequest(req, next, schema);
}