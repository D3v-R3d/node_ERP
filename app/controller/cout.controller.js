const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const  coutService = require('../Service/cout.service')
const  fournisseurService = require('../Service/fournisseur.service')
const ouvrageService = require("../Service/ouvrage.service");
const {number} = require("joi");

// routes

router.get('/', getAll);
router.get('/designation/:designation', getCoutByLabel);
router.get('/listCout', getAllForList);
router.get('/lastCout', getLast);
router.get('/isCouts', getAllCouts);
router.get('/isFraisDeChantiers', getAllFraisDeChantiers);
router.get('/:id', getById);
router.post('/new', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;



function getAll(req, res, next) {
    coutService.getAll(req.query.EntrepriseId)
        .then(cout => res.json(cout))
        .catch(next);
}
async function getCoutByLabel(req,res, next) {
    coutService.getCoutByLabel(req.params.designation)
        .then(cout => res.json(cout))
        .catch(next);
}
function getAllForList(req, res, next) {
    coutService.getAllForList(req.query.EntrepriseId)
        .then(cout => res.json(cout))
        .catch(next);
}
function getLast(req, res, next) {
    coutService.getLast()
        .then(cout => res.json(cout))
        .catch(next);
}

function getAllCouts(req, res, next) {
    coutService.getAllCouts()
        .then(ouvrage => res.json(ouvrage))
        .catch(next);
}
function getAllFraisDeChantiers(req, res, next) {
    coutService.getAllFraisDeChantiers()
        .then(ouvrage => res.json(ouvrage))
        .catch(next);
}

function getById(req, res, next) {
    coutService.getById(req.params.id)
        .then(cout => res.json(cout))
        .catch(next);
}

function create(req, res, next) {
    coutService.create(req.body)
        .then((cout) => res.send({
            message: 'cout créer',
            cout: cout
        }))
        .catch(next);
}

function update(req, res, next) {
    coutService.update(req.params.id, req.body)
        .then(() => res.send({
            message: 'cout modifier',
            cout: req.body
        }))
        .catch(next);
}

function _delete(req, res, next) {
    coutService.delete(req.params.id)
        .then(() => res.send({
            message: 'cout effacer',
            cout: req.body
        }))
        .catch(next);
}


function createSchema(req, res, next) {
    const schema = Joi.object({
        designation: Joi.string(),
        unite: Joi.string(),
        prixUnitaire:Joi.number(),
        EntrepriseId: Joi.number(),
        TypeCoutId: Joi.number(),
        FournisseurId:Joi.number()
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        designation: Joi.string(),
        unite: Joi.string(),
        prixUnitaire:Joi.number(),
        EntrepriseId: Joi.number(),
        TypeCoutId: Joi.number(),
        FournisseurId:Joi.number()

    })

    validateRequest(req, next, schema);
}
