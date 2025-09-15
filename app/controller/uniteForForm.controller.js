const express = require('express');
const router = express.Router();
const UniteForFormService = require('../Service/uniteFormForm.service');
const Joi = require("joi");
const validateRequest = require("../_middleware/validate-request");
const fournisseurService = require("../Service/fournisseur.service");

// Routes
router.get('/', getAll);
router.get('/:id', getById);
router.post('/new', create,createSchema);
router.put('/:id', update);
router.delete('/:id', remove);
router.get('/entreprise/:id', getUniteByEntreprise);
router.get('/type/:id', getUnitesByTypeCoutId);
router.get('/bylabel/:name', getUniteByLabel);


module.exports = router;

// Route handlers

function getAll(req, res, next) {
    UniteForFormService.getAll()
        .then(data => res.json(data))
        .catch(next);
}

function getById(req, res, next) {
    UniteForFormService.getById(req.params.id)
        .then(data => res.json(data))
        .catch(next);
}



function getUniteByEntreprise(req, res, next) {
    UniteForFormService.getByEntrepriseId(req.params.id)
        .then(unite => res.json(unite))
        .catch(next);
}

async function getUnitesByTypeCoutId(req, res, next) {
    try {
        const unites = await UniteForFormService.getUnitesByTypeCoutId(req.params.id);
        res.json(unites);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des unités.' });
    }
}
async function getUniteByLabel(req, res, next) {
    try {
        const uniteId = await UniteForFormService.getUniteByLabel(req.params.name);
        if (uniteId === null) {
            res.status(404).json({ message: `Unité "${req.params.name}" not found` });
        } else {
            res.json(uniteId);
        }
    } catch (error) {
        next(error);
    }
}

function create(req, res, next) {
    console.log(req.body)
    UniteForFormService.create(req.body)
        .then(data => res.json({
            message: 'creation ok',
            data: data }))
        .catch(next);
}


function update(req, res, next) {
    UniteForFormService.updateById(req.params.id, req.body)
        .then(data => res.json(data))
        .catch(next);
}

function remove(req, res, next) {
    UniteForFormService.deleteById(req.params.id)
        .then(data => res.json(data))
        .catch(next);
}


function createSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string(),
        EntrepriseId: Joi.number(),

    });
    validateRequest(req, next, schema);
}
