const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const clientService = require('../Service/client.service')
const authorize = require('../_middleware/authorize')

// routes
router.get('/', getAll);
router.get('/entreprise', getAllByEntrepriseId);
router.get('/by/denomination', getBydenomination);
router.get('/:id', getById);
router.get('/entreprises/:id', getByCompany);
router.post('/new', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
    clientService.getAll()
        .then(clients => res.json(clients))
        .catch(next);
}
function getAllByEntrepriseId(req, res, next) {
    clientService.getAllByEntrepriseId(req.query.EntrepriseId)
        .then(clients => res.json(clients))
        .catch(next);
}
function getBydenomination(req, res, next) {
    console.log(req.query.denomination)
    clientService.getBydenomination(req.query.denomination)
        .then(clients => res.json(clients))
        .catch(next);
}

function getByCompany(req, res, next) {
    clientService.getByCompany(req.params.id)
        .then(clients => res.json(clients))
        .catch(next);
}
function getById(req, res, next) {
    clientService.getById(req.params.id)
        .then(clients => res.json(clients))
        .catch(next);
}


function create(req, res, next) {
    clientService.create(req.body)
        .then((clients) => res.send({
            message: 'Client créer',
            client: clients
        }))
        .catch(next);
}

function update(req, res, next) {
    clientService.update(req.params.id, req.body)
        .then(() => res.send({
            message: 'Client modifier',
            client: res.body
        }))
        .catch(next);
}

function _delete(req, res, next) {
    clientService.delete(req.params.id)
        .then(() => res.send({
            message: 'Client effacer',
            client: res.body

        }))
        .catch(next);
}

// schema functions

function createSchema(req, res, next) {
    const schema = Joi.object({
        firstName: Joi.string().empty(''),
        lastName: Joi.string().empty(''),
        denomination: Joi.string(),
        email: Joi.string().email().empty(''),
        phonenumber: Joi.number().empty(''),
        type: Joi.string(),
        tvaintra: Joi.number().empty(''),
        siret: Joi.number().empty(''),
        EntrepriseId: Joi.number(),
        Adresse:{
            adresses: Joi.string(),
            zipcode: Joi.number().allow(null),
            city: Joi.string(),
            country: Joi.string().empty(''),
        }
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        firstName: Joi.string().allow(null),
        lastName: Joi.string().allow(null),
        denomination: Joi.string(),
        email: Joi.string().email().allow(null),
        phonenumber: Joi.number().allow(null),
        type: Joi.string(),
        tvaintra: Joi.number(),
        siret: Joi.number(),
        EntrepriseId: Joi.number(),
        // AdresseId: Joi.number(),
        Adresse:{
            id:Joi.number(),
            adresses: Joi.string(),
            zipcode: Joi.number().allow(null),
            city: Joi.string(),
            country: Joi.string(),
        }
    })
    validateRequest(req, next, schema);
}
