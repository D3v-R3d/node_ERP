const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const lotSousLotService = require('../Service/lotSousLot.service')

// routes
router.get('/', getAll);
router.get('/lotSousLot', getLotSousLotBySousLotIdAndLotId);
router.get('/:id', getById);
router.post('/new', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
    lotSousLotService.getAll()
        .then(lotSousLot => res.json(lotSousLot))
        .catch(next);
}
function getLotSousLotBySousLotIdAndLotId(req, res, next) {
    console.log("console log des query get lot sous lot:",req.query)
    lotSousLotService.getLotSousLotBySousLotIdAndLotId(req.query.SousLotId,req.query.LotId)
        .then(lotSousLot => res.json(lotSousLot))
        .catch(next);
}

function getById(req, res, next) {
    lotSousLotService.getById(req.params.id)
        .then(lotSousLot => res.json(lotSousLot))
        .catch(next);
}

function create(req, res, next) {
    lotSousLotService.create(req.body)
        .then(() => res.send({
            message: 'lotSousLot créer',
            lotSousLot: res.body
        }))
        .catch(next);
}

function update(req, res, next) {
    lotSousLotService.update(req.params.id, req.body)
        .then(() => res.send({
            message: 'lotSousLot modifier',
            lotSousLot: res.body
        }))
        .catch(next);
}

function _delete(req, res, next) {
    lotSousLotService.delete(req.params.id)
        .then(() => res.send({
            message: 'lotSousLot effacer',
            lotSousLot: res.body

        }))
        .catch(next);
}

// schema functions

function createSchema(req, res, next) {
    const schema = Joi.object({
        SousLotId: Joi.number().empty(''),
        LotId: Joi.number().empty(''),
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        SousLotId: Joi.number().empty(''),
        LotId: Joi.number().empty(''),
    })
    validateRequest(req, next, schema);
}
