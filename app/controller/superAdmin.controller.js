const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const Role = require('../_helpers/role');
const SuperAdminService = require('../Service/superAdmin.service');
const authorize = require('../_middleware/authorize')

// routes

router.get('/',getAll);
router.get('/:id', getUserByEntreprise);
// router.post('/new', createSchema, create);
// router.put('/:id', updateSchema, update);
// router.delete('/:id', _delete);
// router.post('/authenticate', authenticateSchema, authenticate);
router.get('/current', getCurrent);



module.exports = router;

// route functions

function getUserByEntreprise(req, res, next) {
    SuperAdminService.getAllByEntreprise(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}

// function authenticateSchema(req, res, next) {
//     const schema = Joi.object({
//         email: Joi.string().required(),
//         password: Joi.string().required()
//     });
//     validateRequest(req, next, schema);
// }
//
// function authenticate(req, res, next) {
//     SuperAdminService.authenticate(req.body)
//         .then(user => res.json(user))
//         .catch(next);
// }

function getAll(req, res, next) {
    SuperAdminService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

function getCurrent(req, res, next) {
    res.json(req.user);
}

function getById(req, res, next) {
    SuperAdminService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}

// function create(req, res, next) {
//     SuperAdminService.create(req.body)
//         .then(() => res.json({ message: 'Super Admin  created' }))
//         .catch(next);
// }
//
// function update(req, res, next) {
//     SuperAdminService.update(req.params.id, req.body)
//         .then(() => res.json({ message: 'Super Admin updated' }))
//         .catch(next);
// }
//
// function _delete(req, res, next) {
//     SuperAdminService.delete(req.params.id)
//         .then(() => res.json({ message: 'super admin deleted' }))
//         .catch(next);
// }

// schema functions

function createSchema(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        role: Joi.string().valid(Role.Admin, Role.Users, Role.SuperAdmin).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),

    });
    console.log('toto')
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().empty(''),
        firstName: Joi.string().empty(''),
        lastName: Joi.string().empty(''),
        role: Joi.string().valid(Role.Admin, Role.Users, Role.SuperAdmin).empty(''),
        email: Joi.string().email().empty(''),
        password: Joi.string().min(6).empty(''),
    })
    validateRequest(req, next, schema);
}
