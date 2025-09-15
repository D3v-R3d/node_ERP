const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const authorize = require('../_middleware/authorize');
const entrepriseService = require('../Service/entreprise.service')
const adresseService = require('../Service/adresse.service')

// routes

router.get('/', getAll);
router.get('/:id', getById);
router.post('/new', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);
router.get('/admin/entreprise/:id', getById);
router.get('/admin/entreprise/client/:id', getClientByEntreprise);

module.exports = router;

//ADD MIDDLWARE IN ALL ROUTE ,authorize()

// route functions

function getAll(req, res, next) {
    entrepriseService.getAll()
        .then(entreprise => res.json(entreprise))
        .catch(next);
}

function getClientByEntreprise(req, res, next) {
    entrepriseService.getClientByEntreprise(req.params)
        .then(entreprise => res.json(entreprise))
        .catch(next);

}

function getById(req, res, next) {
    entrepriseService.getById(req.params.id)
        .then(entreprise => res.json(entreprise))
        .catch(next);
}



function create(req, res, next) {
     console.log("ENTREPRISE CONTROLLER CREATE", req.body)
    entrepriseService.create(req.body)
        .then(() => res.json({
            message: 'Entreprise créer',
            entreprise: req.body
        }),)

        .catch(next);

}

function update(req, res, next) {
    console.log(req.params.id)
    const id = req.params.id
    entrepriseService.update(id, req.body)
        .then(() => res.json({
            message: 'Entreprise modifier',
            entreprise: req.body

        }))
        .catch(next);
}

function _delete(req, res, next) {
    entrepriseService.delete(req.params.id)
        .then(() => res.json({
            message: 'Entreprise effacer',
            entreprise: req.body

        }))
        .catch(next);
}

// schema functions

function createSchema(req, res, next) {
    const schema = Joi.object({
            commercialName: Joi.string().empty(''),
            denomination: Joi.string(),
            formeJuridique: Joi.string().empty(''),
            rcs: Joi.number().empty(''),
            siret: Joi.number().empty(''),
            nafCode: Joi.number().empty(''),
            tvaNumber: Joi.number().empty(''),
            capital: Joi.number().empty(''),
            email: Joi.string().email().empty(''),
            phoneNumber: Joi.number(),
            Adresse: Joi.object().keys({
            adresses: Joi.string(),
            zipcode: Joi.number(),
            city: Joi.string(),
            country: Joi.string()
        }),
            logo:Joi.any(),

        })
    ;
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        commercialName: Joi.string(),
        denomination: Joi.string(),
        formeJuridique: Joi.string(),
        rcs: Joi.number(),
        siret: Joi.number(),
        nafCode: Joi.number(),
        tvaNumber: Joi.number(),
        capital: Joi.number(),
        email: Joi.string(),
        phoneNumber: Joi.number(),
        AdresseId: Joi.number(),
        Adresse: Joi.object().keys({
            adresses: Joi.string(),
            zipcode: Joi.number(),
            city: Joi.string(),
            country: Joi.string()
        }),
        logo:Joi.any(),


    })
    validateRequest(req, next, schema);
}
