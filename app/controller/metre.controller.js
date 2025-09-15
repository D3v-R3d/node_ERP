const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const metreService = require('../Service/metre.service')

// routes
router.get('/', getAll);
router.get('/ouvrage/:id', getAllByOuvrage);
router.get('/:id', getById);
router.post('/new', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
    metreService.getAll()
        .then(metre => res.json(metre))
        .catch(next);
}
function getAllByOuvrage(req, res, next) {
    metreService.getAllByOuvrage(req.params.id)
        .then(metre => res.json(metre))
        .catch(next);
}

function getById(req, res, next) {
    metreService.getById(req.params.id)
        .then(metre => res.json(metre))
        .catch(next);
}
function create(req, res, next) {
    metreService.create(req.body)
        .then((metre) => res.send({
            message: 'metre créer',
            metre: metre
        }))
        .catch(next);
}

function update(req, res, next) {
    metreService.update(req.params.id, req.body)
        .then(() => res.send({
            message: 'metre modifier',
            metre: res.body
        }))
        .catch(next);
}

function _delete(req, res, next) {
    metreService.delete(req.params.id)
        .then(() => res.send({
            message: 'metre effacer',
            metre: res.body

        }))
        .catch(next);
}

// schema functions

function createSchema(req, res, next) {
    const schema = Joi.object({
        longueur: Joi.number().empty(''),
        largeur: Joi.number().empty(''),
        hauteur: Joi.number().empty(''),
        OuvrageDuDeviId:Joi.number()
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        longueur: Joi.number().empty(''),
        largeur: Joi.number().empty(''),
        hauteur: Joi.number().empty(''),
        OuvrageDuDeviId:Joi.number().empty('')
    })
    validateRequest(req, next, schema);
}
