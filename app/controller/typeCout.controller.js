const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const typeCoutService = require('../Service/typeCout.service')

// routes
router.get('/', getAll);
router.get('/listTypeCout', getAllForList);
router.get('/:id', getById);
router.get('/categorie/:categorie', getTypeCoutIdByLabel);
router.get('/type/:type', getCategorieByType);
router.post('/new', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);
router.get('/type/:type/categorie/:categorie', getTypeCoutIdByTypeAndCategorie);



module.exports = router;

// route functions

function getAll(req, res, next) {
    typeCoutService.getAll(req.query.EntrepriseId)
        .then(clients => res.json(clients))
        .catch(next);
}
function getAllForList(req, res, next) {
    typeCoutService.getAllForList(req.query.EntrepriseId)
        .then(clients => res.json(clients))
        .catch(next);
}

function getById(req, res, next) {
    typeCoutService.getById(req.params.id)
        .then(clients => res.json(clients))
        .catch(next);
}

async function getTypeCoutIdByLabel(req, res, next) {
    console.log(req.params)
    try {
        const typeId = await typeCoutService.getTypeCoutIdByLabel(req.params.categorie);
        if (!typeId) {
        res.status(404).json({ message: `Types cout "${req.params.commercialName}" not found` });
        }else {
            res.json(typeId);
        }
    } catch (error) {
    }
}
async function getTypeCoutIdByTypeAndCategorie(req, res, next) {
    const type = decodeURIComponent(req.params.type);
    const categorie = decodeURIComponent(req.params.categorie);
    try {
        const typeId = await typeCoutService.getTypeCoutIdByTypeAndCategorie(type, categorie);
        if (!typeId) {
            res.status(404).json({ message: `TypeCout "${type}" et "${categorie}" not found` });
        }else {
            res.json(typeId);
        }
    } catch (error) {
        next(error);
    }
}



async function getCategorieByType(req, res, next) {
    const type = req.params.type;
    try {
        const categories = await typeCoutService.getCategorieByType(type);
        res.json(categories);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Une erreur est survenue lors de la récupération des catégories.'});
    }
}


function create(req, res, next) {
    typeCoutService.create(req.body)
        .then((typeCout) => res.send({
            message: 'TypeCout créé',
            typeCout: typeCout
        }))
        .catch(next);
}

function update(req, res, next) {
    typeCoutService.update(req.params.id, req.body)
        .then(() => res.send({
            message: 'TypeCout modifier',
            typeCout: res.body
        }))
        .catch(next);
}

function _delete(req, res, next) {
    typeCoutService.delete(req.params.id)
        .then(() => res.send({
            message: 'TypeCout effacer',
            typeCout: res.body

        }))
        .catch(next);
}

// schema functions

function createSchema(req, res, next) {
    const schema = Joi.object({
        type: Joi.string().empty(''),
        categorie: Joi.string().empty(''),
        CoutId: Joi.number().empty(''),
        EntrepriseId: Joi.number()
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        type: Joi.string().empty(''),
        categorie: Joi.string().empty(''),
        CoutId: Joi.number().empty(''),
        EntrepriseId: Joi.number()
    })
    validateRequest(req, next, schema);
}
