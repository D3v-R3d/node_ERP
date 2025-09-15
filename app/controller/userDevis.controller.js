const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const userDevisService = require("../Service/userDevis.service");


router.get('/new/:DeviId/:UserId', createSchema, create);
router.delete('/:DeviId/:UserId', _delete);
router.get('/', getAll );
router.get('/:id', getById );

module.exports = router;

function getAll(req, res, next) {
    userDevisService.getAll()
        .then(userDevis => res.json(userDevis))
        .catch(next);
}
function getById(req, res, next) {
    userDevisService.getById(req.params.id)
        .then(userDevis => res.json(userDevis))
        .catch(next);
}

function _delete(req, res, next) {
    userDevisService.deleteByUserAndDevis(req.params)
        .then(userDevis => res.json(userDevis))
        .catch(next);
}

function create (req, res, next) {
    if(isNaN(req.params)){
        res.send("error");
        return false
    }
    userDevisService.create(req.params)
        .then(() => res.json({
            message: 'User ajouter au devis',
            userDevis: req.body
        }))
        .catch(next);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        UserId: Joi.number(),
        DeviId: Joi.number()
    });
    validateRequest(req, next, schema);
}