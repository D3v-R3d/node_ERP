const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const  fournisseurCoutService = require('../Service/fournisseurCout.service')


router.put('/:CoutId/:FournisseurId', updateSchema, updatetest);
router.get('/', getAll);
router.get('/:id', getById);
router.get('/new/:CoutId/:FournisseurId', createSchema, create);
//router.put('/:id', updateSchema, update);
//router.put('/:CoutId/:FournisseurId', updateSchema, updatetest);
router.delete('/:id', _delete);

module.exports = router;


function getAll(req, res, next) {
    fournisseurCoutService.getAll()
        .then(sousLot => res.json(sousLot))
        .catch(next);
}

function getById(req, res, next) {
    fournisseurCoutService.getById(req.params.id)
        .then(sousLot => res.json(sousLot))
        .catch(next);
}

function create(req, res, next) {
    fournisseurCoutService.create(req.params)
        .then(fournisseurCout => res.send({
            message: 'fournisseur cout créer',
            fournisseurCout: fournisseurCout
        }))
        .catch(next);
}

function update(req, res, next) {
    fournisseurCoutService.update(req.params.id, req.body)
        .then(fournisseurCout => res.json({
            message: 'sousLot modifier',
            fournisseurCout: fournisseurCout
        }))
        .catch(next);
}
///////////////////////////////
///////////////////////////////
///////////////////////////////
function updatetest(req, res, next) {
    console.log("fournisseurCoutService",req.body)
    fournisseurCoutService.updatetest(req.params.CoutId, req.params.FournisseurId, req.body)
        .then(fournisseurCout => res.json({
            message: 'test modifier',
            fournisseurCout: fournisseurCout
        }))
        .catch(next);
}

function _delete(req, res, next) {
    fournisseurCoutService.delete(req.params.id)
        .then(fournisseurCout => res.json({
            message: 'fournisseurCout effacer',
            fournisseurCout: fournisseurCout
        }))
        .catch(next);
}


function createSchema(req, res, next) {
    const schema = Joi.object({
        FournisseurId: Joi.number(),
        CoutId: Joi.number(),
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        FournisseurId: Joi.number(),
        CoutId: Joi.number(),
    })
    validateRequest(req, next, schema);
}
