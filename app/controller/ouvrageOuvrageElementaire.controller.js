const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const ouvrageOuvrageElementaireService = require('../Service/ouvrageOuvrageElementaire.service')
const db = require('../_helpers/db');

//
router.post('/sousDetail/new/:OuvrageDuDeviId',createSchema, createByDesignation);
router.post('/new',createSchema, create);
// router.get('/price/:id', getOuvragePriceById )
router.delete('/:OuvrageId/:OuvragesElementaireId', _delete);
router.get('/', getAll )
// router.get('/price', getAllOuvragePrice)
router.get('/:id', getById)
router.put('/:CoutId/:OuvrageId', updateSchema, update )

module.exports = router;

function getAll(req, res, next) {
    ouvrageOuvrageElementaireService.getAll()
        .then(ouvrageCout => res.json(ouvrageCout))
        .catch(next);
}
// function getOuvragePriceById(req, res, next) {
//     ouvrageElementaireCoutService.getOuvragePriceById(req.params.id)
//         .then(ouvrageCout => res.json(ouvrageCout))
//         .catch(next);
// }
// function getAllOuvragePrice(req, res, next) {
//     ouvrageElementaireCoutService.getAllOuvragePrice()
//         .then(ouvrageCout => res.json(ouvrageCout))
//         .catch(next);
// }
function getById(req, res, next) {
    ouvrageOuvrageElementaireService.getById(req.params.id)
        .then(ouvrageCout => res.json(ouvrageCout))
        .catch(next);
}

function _delete(req, res, next) {
    console.log("params controller",req.params)
    ouvrageOuvrageElementaireService.deleteByCoutAndOuvrage(req.params)
        .then(ouvrageCout => res.json(ouvrageCout))
        .catch(next);
}

function create (req, res, next) {
    ouvrageOuvrageElementaireService.create(req.body)
        .then(() => res.json({
            message: 'Cout ajouter à l ouvrage',
            ouvrageCout: req.body
        }))
        .catch(next);
}

function createByDesignation (req, res, next) {
    console.log('create ouvrage elementaire cout controller ')
    console.log(req.body)
    ouvrageOuvrageElementaireService.createByDesignation(req.body, req.params)
        .then(() => res.json({
            message: 'Cout ajouter à l ouvrage',
            ouvrageCout: req.body
        }))
        .catch(next);
}


function update (req, res, next) {
    ouvrageOuvrageElementaireService.update(req.params, req.body)
        .then(() => res.json({
            message: 'Cout ajouter à l ouvrage',
            ouvrageCout: req.body
        }))
        .catch(next);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        OuvragesElementaireId: Joi.number(),
        OuvrageId: Joi.number(),
    });
    validateRequest(req, next, schema);
}
function updateSchema(req, res, next) {
    const schema = Joi.object({
        OuvragesElementaireId: Joi.number(),
        OuvrageId: Joi.number(),
    });
    validateRequest(req, next, schema);
}