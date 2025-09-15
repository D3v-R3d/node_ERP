const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const  ouvrageService = require('../Service/ouvrage.service')


router.get('/price', getAllPrice);
router.get('/', getAll);
router.get('/couts', getAllWithCout);
router.get('/isFraisDeChantiers', getAllFraisDeChantiers);
router.get('/exceptFrais', getAllExceptFraisDeChantiers);
router.get('/:id', getById);
router.post('/new', createSchema, create);
router.post('/sousLot',createSousLotOuvrage);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;

function createSousLotOuvrage(req, res, next)
{
    ouvrageService.createSousLotOuvrage(req.body)
        .then(ouvrage=>res.send(ouvrage))
        .catch(next)
}
function getAll(req, res, next) {
    ouvrageService.getAll(req.query.EntrepriseId)
        .then(ouvrage => res.json(ouvrage))
        .catch(next);
}
function getAllWithCout(req, res, next) {
    ouvrageService.getAllWithCout(req.query.EntrepriseId)
        .then(ouvrage => res.json(ouvrage))
        .catch(next);
}
function getAllPrice(req, res, next) {
    ouvrageService.getAllPrice()
        .then(ouvrage => res.json(ouvrage))
        .catch(next);
}
function getAllFraisDeChantiers(req, res, next) {
    ouvrageService.getAllFraisDeChantiers(req.query.EntrepriseId)
        .then(ouvrage => res.json(ouvrage))
        .catch(next);
}
function getAllExceptFraisDeChantiers(req, res, next) {
    ouvrageService.getAllExceptFraisDeChantiers(req.query.EntrepriseId)
        .then(ouvrage => res.json(ouvrage))
        .catch(next);
}

function getById(req, res, next) {
    ouvrageService.getById(req.params.id)
        .then(ouvrage => res.json(ouvrage))
        .catch(next);
}
function create(req, res, next) {
    console.log(req.body)
    ouvrageService.create(req.body)
        .then(() => res.send({
            message: 'ouvrage créer',
            ouvrage: req.body
        }))
        .catch(next);
}

function update(req, res, next) {
    ouvrageService.update(req.params.id, req.body)
        .then(() => res.json({
            message: 'ouvrage modifier',
            ouvrage: req.body
        }))
        .catch(next);
}

function _delete(req, res, next) {
    ouvrageService.delete(req.params.id)
        .then(() => res.json({
            message: 'ouvrage effacer',
            ouvrage: req.body
        }))
        .catch(next);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        designation: Joi.string(),
        benefice:Joi.number(),
        aleas: Joi.number(),
        unite: Joi.string(),
        ratio: Joi.number(),
        uRatio: Joi.string(),
        prix : Joi.number(),
        EntrepriseId: Joi.number(),
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        designation: Joi.string(),
        benefice:Joi.number(),
        aleas: Joi.number(),
        unite: Joi.string(),
        ratio: Joi.number(),
        uRatio: Joi.string(),
        prix : Joi.number(),
        EntrepriseId: Joi.number()
    })
    validateRequest(req, next, schema);
}