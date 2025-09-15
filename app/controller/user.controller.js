const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const Role = require('../_helpers/role');
const userService = require('../Service/user.service');
const authorize = require('../_middleware/authorize')

// routes

router.get('/',getAll);
router.get('/:id', getById);
router.post('/new', createSchema, create,);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);
router.post('/authenticate', authenticateSchema, authenticate);
router.get('/current', getCurrent);
router.put('/update-password/:id', updatePasswordSchema, updatePassword);




module.exports = router;

// route functions

function updatePassword(req, res, next) {
    userService.updatePassword(req.params.id, req.body.oldPassword, req.body.password, req.body.firstConnexion)
        .then(user => res.json({
            message: 'User password updated',
            user: user
        }))
        .catch(next);
}

function authenticateSchema(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => res.json(user))
        .catch(next);
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

function getCurrent(req, res, next) {
    res.json(req.user);
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}

function create(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({
            message: 'User created',
            user: req.body
        }))
        .catch(next);
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.json({
            message: 'User updated',
            user: req.body
        }))
        .catch(next);
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({ message: 'User deleted' }))
        .catch(next);
}

// schema functions

function createSchema(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        role: Joi.string().valid(Role.Admin, Role.Users,Role.SuperAdmin).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        avatarUrl:Joi.string(),
        EntrepriseId: Joi.array(),
        firstConnexion:Joi.boolean(),
        Adresse:{
            adresses:Joi.string(),
            zipcode:Joi.number(),
            city:Joi.string(),
            country:Joi.string(),
        },
        Entreprise:{
            commercialName: Joi.string(),
            denomination:Joi.string(),
            formeJuridique: Joi.string(),
            rcs: Joi.number(),
            siret: Joi.number(),
            nafCode: Joi.number(),
            tvaNumber: Joi.number(),
            capital: Joi.number(),
            email: Joi.string().email(),
            phoneNumber: Joi.number(),
            AdresseId: Joi.number(),
        }


    },
    );
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        title: Joi.string(),
        firstName: Joi.string(),
        lastName: Joi.string(),
        role: Joi.string().valid(Role.Admin, Role.Users,Role.SuperAdmin).empty(''),
        email: Joi.string().email(),
        password: Joi.string().min(6),
        avatarUrl:Joi.string(),
        // AdresseId: Joi.number(),
        EntrepriseId: Joi.array(),

    })
    validateRequest(req, next, schema);
}
function updatePasswordSchema(req, res, next) {
    const schema = Joi.object({
        oldPassword: Joi.string().min(6).required(),
        password: Joi.string().min(6).required(),
        firstConnexion :Joi.boolean()
    });
    validateRequest(req, next, schema);
}
