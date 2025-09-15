const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const userEntrepriseService = require('../Service/userEntreprise.service')

// routes
router.get('/', getAll);
router.get('/:id', getById);
router.post('/new', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
    userEntrepriseService.getAll()
        .then(userEntreprise => res.json(userEntreprise))
        .catch(next);
}

function getById(req, res, next) {
    userEntrepriseService.getById(req.params.id)
        .then(userEntreprise => res.json(userEntreprise))
        .catch(next);
}

function create(req, res, next) {
    userEntrepriseService.create(req.body)
        .then(() => res.send({
            message: 'userEntreprise créer',
            userEntreprise: res.body
        }))
        .catch(next);
}

function update(req, res, next) {
    userEntrepriseService.update(req.params.id, req.body)
        .then(() => res.send({
            message: 'userEntreprise modifier',
            userEntreprise: res.body
        }))
        .catch(next);
}

function _delete(req, res, next) {
    userEntrepriseService.delete(req.params.id)
        .then(() => res.send({
            message: 'userEntreprise effacer',
            userEntreprise: res.body

        }))
        .catch(next);
}

// schema functions

function createSchema(req, res, next) {
    const schema = Joi.object({
        UserId: Joi.number(),
        EntrepriseId:Joi.number()
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({id: Joi.number(),
        UserId: Joi.number(),
        EntrepriseId:Joi.number()
    })
    validateRequest(req, next, schema);
}
