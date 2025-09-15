const express = require('express');
const router = express.Router();
const importExcelService = require('../Service/ImportExcel.service');
const Joi = require("joi");
const validateRequest = require("../_middleware/validate-request");

// Routes
router.get('/', getAll);
router.get('/:id', getById);
router.post('/new', create,createSchema);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router;

// Route handlers

function getAll(req, res, next) {
    importExcelService.getAll()
        .then(data => res.json(data))
        .catch(next);
}

function getById(req, res, next) {
    importExcelService.getById(req.params.id)
        .then(data => res.json(data))
        .catch(next);
}

function create(req, res, next) {
    console.log(req.body)
    importExcelService.create(req.body)
        .then(data => res.json({
            message: 'Import ok',
            data: data }))
        .catch(next);
}


function update(req, res, next) {
    importExcelService.updateById(req.params.id, req.body)
        .then(data => res.json(data))
        .catch(next);
}

function remove(req, res, next) {
    importExcelService.deleteById(req.params.id)
        .then(data => res.json(data))
        .catch(next);
}


function createSchema(req, res, next) {
    const schema = Joi.object({
        title: Joi.string(),
        data: Joi.object(),

    });
    validateRequest(req, next, schema);
}
