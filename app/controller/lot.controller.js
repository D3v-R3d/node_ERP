const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const lotService = require('../Service/lot.service')
const authorize = require('../_middleware/authorize')

router.get('/', authorize, getAll);
router.get('/:id', getById);
router.get('/sousLots/:id', getSousLotByLotId);
router.get('/lotHiddenForOuvrage/:id', getLotHiddenForOuvrage);
router.get('/lotHiddenForCout/:id', getLotHiddenForCout);
router.post('/new', createSchema, create);
router.post('/newFraisDeChantier', createSchema, createLotFraisDeChantier);
router.post('/newHiddenLot', createSchema, createHiddenlot);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;

// function getFraisDeChantier(req, res, next) {
//     lotService.getFraisDeChantier(req.query.DeviId)
//         .then(cout => res.json(cout))
//         .catch(next);
// }

function getAll(req, res, next) {
    lotService.getAll()
        .then(lot => res.json(lot))
        .catch(next);
}


function getById(req, res, next) {
    lotService.getById(req.params.id)
        .then(lot => res.json(lot))
        .catch(next);
}
function getLotHiddenForOuvrage(req, res, next) {
    lotService.getLotHiddenForOuvrage(req.params.id)
        .then(lot => res.json(lot))
        .catch(next);
}
function getLotHiddenForCout(req, res, next) {
    lotService.getLotHiddenForCout(req.params.id)
        .then(lot => res.json(lot))
        .catch(next);
}
function getSousLotByLotId(req, res, next) {
    lotService.getSousLotByLotId(req.params.id)
        .then(lot => res.json(lot))
        .catch(next);
}
function create(req, res, next) {
    lotService.create(req.body)
        .then((lot) => res.send({

            message: 'lot créer',
            lot: lot
        }))
        .catch(next);
    // console.log("response.send",lot)
}
function createLotFraisDeChantier(req, res, next) {
    lotService.createLotFraisDeChantier(req.body)
        .then((lot) => res.send({
            message: 'lot créer',
            lot: lot
        }))
        .catch(next);
    // console.log("response.send",lot)
}

function createHiddenlot(req, res, next) {
    lotService.createHiddenlot(req.body)
        .then((lot) => res.send({
            message: 'lot hidden créer',
            lot: lot
        }))
        .catch(next);
    // console.log("response.send",lot)
}

function update(req, res, next) {
    lotService.update(req.params.id, req.body)
        .then(() => res.json({
            message: 'lot modifier',
            lot: req.body
        }))
        .catch(next);
}

function _delete(req, res, next) {
    lotService.delete(req.params.id)
        .then(() => res.json({
            message: 'lot effacer',
            lot: req.body
        }))
        .catch(next);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        id: Joi.number(),
        devisId : Joi.number(),
        designation: Joi.string(),
        SousLotId:Joi.number()
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        designation: Joi.string(),
        SousLotId:Joi.number()
    })
    validateRequest(req, next, schema);
}

