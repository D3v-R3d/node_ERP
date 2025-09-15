const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const  ouvrageElementaireService = require('../Service/ouvrages-elementaire..service')


// router.get('/price', getAllPrice);
router.get('/', getAll);
// router.get('/isFraisDeChantiers', getAllFraisDeChantiers);
// router.get('/exceptFrais', getAllExceptFraisDeChantiers);
router.get('/:id', getById);
router.post('/new', createSchema, create);
// router.post('/sousLot',createSousLotOuvrage);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;


function getAll(req, res, next) {
    ouvrageElementaireService.getAll(req.query.EntrepriseId)
        .then(ouvrage => res.json(ouvrage))
        .catch(next);
}




function getById(req, res, next) {
    ouvrageElementaireService.getById(req.params.id)
        .then(ouvrage => res.json(ouvrage))
        .catch(next);
}
function create(req, res, next) {
    console.log(req.body)
    ouvrageElementaireService.create(req.body)
        .then((ouvrage) => res.send({
            message: 'ouvrage elem créer',
            ouvrage: ouvrage,
            id: ouvrage.id
        }))
        .catch(next);
}

function update(req, res, next) {
    ouvrageElementaireService.update(req.params.id, req.body)
        .then(() => res.json({
            message: 'ouvrage elem modifier',
            ouvrage: req.body
        }))
        .catch(next);
}

function _delete(req, res, next) {
    ouvrageElementaireService.delete(req.params.id)
        .then(() => res.json({
            message: 'ouvrage elem effacer',
            ouvrage: req.body
        }))
        .catch(next);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        designation: Joi.string(),
        unite:Joi.string(),
        proportion: Joi.number(),
        prix: Joi.number(),
        remarques: Joi.string(),
        uniteproportionOE: Joi.string(),
        EntrepriseId: Joi.number(),


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
    })
    validateRequest(req, next, schema);
}