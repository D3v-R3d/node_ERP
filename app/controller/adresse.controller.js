const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const adresseService = require('../Service/adresse.service')

// routes
router.get('/', getAll);
router.get('/:id', getById);
router.post('/new', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
    adresseService.getAll()
        .then(clients => res.json(clients))
        .catch(next);
}

function getById(req, res, next) {
    adresseService.getById(req.params.id)
        .then(clients => res.json(clients))
        .catch(next);
}

function create(req, res, next) {
    adresseService.create(req.body)
        .then(() => res.send({
            message: 'Adresse créer',
            adresse: res.body
        }))
        .catch(next);
}

function update(req, res, next) {
    adresseService.update(req.params.id, req.body)
        .then(() => res.send({
            message: 'Adresse modifier',
            adresse: res.body
        }))
        .catch(next);
}

function _delete(req, res, next) {
    adresseService.delete(req.params.id)
        .then(() => res.send({
            message: 'Adresse effacer',
            adresse: res.body

        }))
        .catch(next);
}

// schema functions

function createSchema(req, res, next) {
    const schema = Joi.object({
        adresses: Joi.string().empty(''),
        zipcode: Joi.number().empty(''),
        city: Joi.string().empty(''),
        country: Joi.string().empty(''),
        ClientId:Joi.number()

    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        adresses: Joi.string().empty(''),
        zipcode: Joi.number(),
        city: Joi.string().empty(''),
        country: Joi.string().empty(''),
        ClientId:Joi.number()
    })
    validateRequest(req, next, schema);
}
