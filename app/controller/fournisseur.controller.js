const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const fournisseurService = require('../Service/fournisseur.service')

// routes
router.get('/', getAll);
router.get('/listFournisseur', getAllForList);
router.get('/name/:commercialName', getFournisseurIdByName);
router.get('/:id', getById);
router.post('/new', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
    console.log("req query fournisseur controller",req.query)
    fournisseurService.getAll(req.query.EntrepriseId)
        .then(fournisseur => res.json(fournisseur))
        .catch(next);
}function getAllForList(req, res, next) {
    fournisseurService.getAllForList(req.query.EntrepriseId)
        .then(fournisseur => res.json(fournisseur))
        .catch(next);
}

function getById(req, res, next) {
    fournisseurService.getById(req.params.id)
        .then(fournisseur => res.json(fournisseur))
        .catch(next);
}
async function getFournisseurIdByName(req, res, next) {
    try {
        const fournId = await fournisseurService.getFournisseurIdByName(req.params.commercialName);
        if (fournId === null) {
            res.status(404).json({ message: `Fournisseur "${req.params.commercialName}" not found` });
        } else {
            res.json(fournId);
        }
    } catch (error) {
        next(error);
    }
}


function create(req, res, next) {
    fournisseurService.create(req.body)
        .then(() => res.send({
            message: 'Adresse créer',
            fournisseur: res.body
        }))
        .catch(next);
}

function update(req, res, next) {
    fournisseurService.update(req.params.id, req.body)
        .then(() => res.send({
            message: 'Adresse modifier',
            fournisseur: res.body
        }))
        .catch(next);
}

function _delete(req, res, next) {
    fournisseurService.delete(req.params.id)
        .then(() => res.send({
            message: 'Adresse effacer',
            fournisseur: res.body

        }))
        .catch(next);
}

// schema functions

function createSchema(req, res, next) {
    const schema = Joi.object({
        commercialName: Joi.string().empty(''),
        remarque: Joi.string().empty(''),
        CoutId: Joi.number().empty(''),
        EntrepriseId: Joi.number()
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        commercialName: Joi.string().empty(''),
        remarque: Joi.string().empty(''),
        CoutId: Joi.number().empty(''),
        EntrepriseId: Joi.number()

    })
    validateRequest(req, next, schema);
}
