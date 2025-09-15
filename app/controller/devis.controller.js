const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const  DevisService = require('../Service/devis.service')
const {DataTypes} = require("sequelize");
const lotService = require("../Service/lot.service");
// const {getDevisByEntreprise, getAllOuvragesDuDevis} = require("../Service/devis.service");

// routes
router.get('/fraisDeChantier/:id', getByIdFraisDeChantier)
router.get('/',  getAll);
router.get('/exceptFrais/:id',  getByIdExceptFrais);
router.get('/byClient/:id', getDevisByClient);
router.get('/byEntreprise/:id', getDevisByEnrtreprise);
router.get('/byUser/:id', getDevisByUser);
router.get('/:id', getById);
router.get('/detail/:id',  getByIdForDetail);
router.get('/detail/ouvrages/:id', getAllOuvragesDuDevis);
router.post('/new', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;

// route functions

function getById(req, res, next){
    DevisService.getById(req.params.id)
        .then(devis => res.json(devis))
        .catch(next)
}
function getByIdForDetail(req, res, next){
    DevisService.getByIdForDetail(req.params.id)
        .then(devis => res.json(devis))
        .catch(next)
}
function getByIdExceptFrais(req, res, next){
    DevisService.getAllLotExceptFraisDeChantier(req.params.id)
        .then(devis => res.json(devis))
        .catch(next)
}

function getAllOuvragesDuDevis(req, res, next){
    DevisService.getAllOuvragesDuDevis(req.params.id)
        .then(devis => res.json(devis))
        .catch(next)
}
function getByIdFraisDeChantier(req, res, next){
    console.log(req.params.id)
    DevisService.getByIdFraisDeChantier(req.params.id)
        .then(devis => res.json(devis))
        .catch(next)
}

function getAll(req, res, next) {
    DevisService.getAll()
        .then(devis => res.json(devis))
        .catch(next);
}

function getLotSublot(req, res, next) {
    DevisService.getLotSublot(req.params.id)
        .then(devis => res.json(devis))
        .catch(next);
}


function getDevisByClient(req, res, next) {
    DevisService.getDevisByClient(req.params.id)
        .then(devis => res.json(devis))
        .catch(next);
}
function getDevisByUser(req, res, next) {
    DevisService.getDevisByUser(req.params.id)
        .then(devis => res.json(devis))
        .catch(next);
}

function getDevisByEnrtreprise(req, res, next) {
    DevisService.getDevisByEntreprise(req.params.id)
        .then(devis => res.json(devis))
        .catch(next);
}


function create(req, res, next) {
    DevisService.create(req.body)
        .then(() => res.send({
            message: 'Devis créer',
            devis: req.body
        }))
        .catch(next);
}

function update(req, res, next) {
    DevisService.update(req.params.id, req.body)
        .then(() => res.json({
            message: 'Devis modifier',
            devis: req.body
        }))
        .catch(next);
}

function _delete(req, res, next) {
    DevisService.delete(req.params.id)
        .then(() => res.json({
            message: 'Devis effacer',
            devis: req.body
        }))
        .catch(next);
}

// schema functions

function createSchema(req, res, next) {
    const schema = Joi.object({
        name:Joi.string().empty(''),
        status: Joi.string().empty(''),
        ClientId: Joi.number(),
        EntrepriseId: Joi.number(),
        LotId: Joi.number(),
        UserId: Joi.number(),
        fraisGeneraux: Joi.number(),
        coutTotal: Joi.number(),
        debourseSecTotal: Joi.number(),
        totalDepense: Joi.number(),
        moyenneBenefice: Joi.number(),
        moyenneAleas: Joi.number(),
        moyenneBeneficeAleas: Joi.number(),
        coeffEquilibre: Joi.number(),
        prixEquiHT: Joi.number(),
        beneficeInEuro: Joi.number(),
        aleasInEuro: Joi.number(),
        prixCalcHT: Joi.number(),
        prixVenteHT: Joi.number(),
        beneficeAleasTotal: Joi.number(),
        validityTime: Joi.number(),
        beneficeInPercent:Joi.number(),
        aleasInPercent:Joi.number(),


    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        name:Joi.string(),
        status: Joi.string(),
        ClientId: Joi.number(),
        EntrepriseId: Joi.number(),
        LotId: Joi.number(),
        UserId: Joi.number(),
        percentFraisGeneraux: Joi.number(),
        fraisGeneraux: Joi.number(),
        coutTotal: Joi.number(),
        debourseSecTotal: Joi.number(),
        totalDepense: Joi.number(),
        moyenneBenefice: Joi.number(),
        moyenneAleas: Joi.number(),
        moyenneBeneficeAleas: Joi.number(),
        coeffEquilibre: Joi.number(),
        prixEquiHT: Joi.number(),
        beneficeInEuro: Joi.number(),
        aleasInEuro: Joi.number(),
        prixCalcHT: Joi.number(),
        prixVenteHT: Joi.number(),
        beneficeAleasTotal: Joi.number(),
        validityTime: Joi.number(),
        beneficeInPercent:Joi.number(),
        aleasInPercent:Joi.number(),


    })
    validateRequest(req, next, schema);
}
