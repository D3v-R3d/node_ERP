const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const ouvrageElementaireDuDevisService = require('../Service/ouvrageElementaireDuDevis.service')
const db = require("../_helpers/db");

// routes
router.get('/', getAll);
router.get('/:id', getById);
router.post('/new', createSchema, create);
router.put('/:id', updateSchema, update);
// router.post('/sousLot',createSousLotOuvrages);
router.delete('/:id', _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
    ouvrageElementaireDuDevisService.getAll()
        .then(coutDuDevis => res.json(coutDuDevis))
        .catch(next);
}

function getById(req, res, next) {
    ouvrageElementaireDuDevisService.getById(req.params.id)
        .then(coutDuDevis => res.json(coutDuDevis))
        .catch(next);
}

function create(req, res, next) {
    console.log("ouvrage du devis controller create req.body : ",req.body)
    ouvrageElementaireDuDevisService.create(req.body)
        .then((createdOuvrageDuDevis) => res.send({
            message: 'ouvrageElemDuDevis créer',
            OuvrageElemDuDevis: createdOuvrageDuDevis
        }))
        .catch(next);
}

function update(req, res, next) {
    console.log("req.body depuis update ouvrage elementaire du devis controller ", req.body)
    ouvrageElementaireDuDevisService.update(req.params.id, req.body)
        .then((ouvrageElementaireDuDevis) => res.send({
            message: 'ouvrageDuDevis modifier',
            ouvrageElementaireDuDevis: ouvrageElementaireDuDevis
        }))
        .catch(next);
}

function _delete(req, res, next) {
    ouvrageElementaireDuDevisService.delete(req.params.id)
        .then(() => res.send({
            message: 'ouvrageDuDevis effacer',
            coutDuDevis: res.body

        }))
        .catch(next);
}

// function createSousLotOuvrages(req, res, next)
// {
//     console.log("ouvrage du devis controller create sous lot ouvrage", req.body)
//     ouvrageElementaireDuDevisService.createSousLotOuvrage(req.body)
//         .then(ouvrage=>res.send(ouvrage))
//         .catch(next)
// }

// schema functions

function createSchema(req, res, next) {
    const schema = Joi.object({
        designation: Joi.string(),
        unite:Joi.string(),
        proportion: Joi.number(),
        prix: Joi.number(),
        EntrepriseId: Joi.number(),
        remarques: Joi.string(),
        uniteproportionOE: Joi.string(),
        quantite: Joi.number(),


    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        designation: Joi.string(),
        unite:Joi.string(),
        proportion: Joi.number(),
        prix: Joi.number(),
        EntrepriseId: Joi.number(),
        remarques: Joi.string(),
        uniteproportionOE: Joi.string(),
        quantite: Joi.number(),
    })
    validateRequest(req, next, schema);
}
