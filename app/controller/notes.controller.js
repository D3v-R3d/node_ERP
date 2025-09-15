const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const noteService = require('../Service/notes.service');
const db = require("../_helpers/db");

// routes

router.get('/',getAll);
router.get('/:id', getNoteByUser);
router.get('/note/:id', getById);
router.post('/new', createSchema, create,);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);



module.exports = router;

// route functions






function getAll(req, res, next) {
    noteService.getAll()
        .then(note => res.json(note))
        .catch(next);
}



function getById(req, res, next) {
    noteService.getById(req.params.id)
        .then(note => res.json(note))
        .catch(next);
}
function getNoteByUser(req, res, next) {
    noteService.getNoteByUser(req.params.id)
        .then(note => res.json(note))
        .catch(next);
}

function create(req, res, next) {
    console.log(req.body.userId)
    noteService.create(req.body)
        .then(() => res.json({
            message: 'Note created',
            note: req.body,
            UserId:req.body.userId
        }))
        .catch(next);
}

function update(req, res, next) {
    noteService.update(req.params.id, req.body)
        .then(() => res.json({
            message: 'Notes updated',
            note: req.body
        }))
        .catch(next);
}

function _delete(req, res, next) {
    noteService.destroy(req.params.id)
        .then(() => res.json({ message: 'Notes deleted' }))
        .catch(next);
}

// schema functions

function createSchema(req, res, next) {
    const schema = Joi.object({
            title: Joi.string().required(),
            text: Joi.string().required(),
            typeError: Joi.string().required(),
            optionsTypeError: Joi.string(),
            optionsTimestamp: Joi.date(),
            userId: Joi.number().required(),
            }



    );
    console.log('Notes Ok')
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().required(),
        text: Joi.string().required(),
        typeError: Joi.string().required(),
        optionsTypeError: Joi.string(),
        userId: Joi.number(),
        optionsTimestamp: Joi.date(),
        resolution: Joi.boolean(),




    })
    validateRequest(req, next, schema);
}
