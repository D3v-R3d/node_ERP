const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const  sousLotService = require('../Service/sousLot.service')
const {lotId} = require("../Service/lot.service");
const lotService = require("../Service/lot.service");


router.get('/', getAll);
router.get('/:id', getById);
router.get('/sousLotHiddenForOuvrage/:id', getSousLotHiddenForOuvrage);
router.get('/sousLotHiddenForCout/:id', getSousLotHiddenForCout);
router.post('/new/:id', createSchema, create);
router.post('/newHiddenSousLot/:id', createSchema, createHiddenSouslot);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;



function getAll(req, res, next) {
    sousLotService.getAll()
        .then(sousLot => res.json(sousLot))
        .catch(next);
}

function getById(req, res, next) {
    sousLotService.getById(req.params.id)
        .then(sousLot => res.json(sousLot))
        .catch(next);
}
function getSousLotHiddenForOuvrage(req, res, next) {
    sousLotService.getSousLotHiddenForOuvrage(req.params.id)
        .then(sousLot => res.json(sousLot))
        .catch(next);
}
function getSousLotHiddenForCout(req, res, next) {
    sousLotService.getSousLotHiddenForCout(req.params.id)
        .then(sousLot => res.json(sousLot))
        .catch(next);
}
function create(req, res, next) {
    console.log("REQ",req.params.id)
    sousLotService.create(req.body,req.params.id)
        .then(sousLot => res.send({
            message: 'sousLot créer',
            sousLot: sousLot
        }))
        .catch(next);
}
function createHiddenSouslot(req, res, next) {
    sousLotService.createHiddenSouslot(req.body, req.params.id)
        .then((sousLot) => res.send({
            message: 'Souslot hidden créer',
            sousLot: sousLot, // renvoyer le sous-lot créé pour plus de détails
        }))
        .catch(error => {
            console.error('Erreur lors de la création du sous-lot caché:', error); // log l'erreur
            next(error);
        });
}

function update(req, res, next) {
    sousLotService.update(req.params.id, req.body)
        .then(sousLot => res.json({
            message: 'sousLot modifier',
            sousLot: sousLot
        }))
        .catch(next);
}

function _delete(req, res, next) {
    sousLotService.delete(req.params.id)
        .then(sousLot => res.json({
            message: 'sousLot effacer',
            sousLot: sousLot
        }))
        .catch(next);
}


function createSchema(req, res, next) {
    const schema = Joi.object({
        designation: Joi.string(),
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        designation: Joi.string(),
    })
    validateRequest(req, next, schema);
}
