const config = require('../db.config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');
// const db = require('../_helpers/db');
const fs = require("fs");


module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    updatePassword
};

async function authenticate({ email, password }) {
    const user = await db.User.findOne({
        include: [db.Entreprise],
        where: { email }
    });

    if (!user || !(await bcrypt.compare(password, user.password)))
        throw 'Username or password is incorrect';

    // authentication successful
    const token = jwt.sign({sub:user}, config.secret, { expiresIn: '7d' });
    return { ...omitHash(user.get()), token };
}


async function updatePassword(id, oldPassword, newPassword,firstConnexion) {
    const user = await getUser(id);

    // Vérifier si l'ancien mot de passe est correct
    const isOldPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
    if (!isOldPasswordCorrect) {
        throw 'Old password is incorrect';
    }

    // Hash du nouveau mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Mise à jour du mot de passe
    user.password = hashedPassword;
    user.firstConnexion = firstConnexion;

    await user.save();

    return omitHash(user.get());
}

async function getAll() {
    return await db.User.findAll({
        include:[{
            model:db.Entreprise,
            attributes: ['denomination','id']
        }],

    });
}


async function getById(id) {
    return await getUser(id);
}

async function create(userInfo) {
    // Valider les entrées de l'utilisateur
    // ...

    // Vérifier si un utilisateur avec la même adresse e-mail existe déjà
    const existingUser = await db.User.findOne({ where: { email: userInfo.email } });
    if (existingUser) {
        throw new Error(`Un utilisateur avec l'adresse e-mail ${userInfo.email} existe déjà`);
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(userInfo.password, 10);


    // Créer l'utilisateur dans la base de données
    const user = await db.User.create({
        title: userInfo.title,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        role: userInfo.role,
        email: userInfo.email,
        password: hashedPassword,
        EntrepriseId: userInfo.EntrepriseId,
        avatarUrl: userInfo.avatarUrl,
        firstConnexion:userInfo.firstConnexion
    });

    // Ajouter la relation avec l'entreprise
    await user.addEntreprise(userInfo.EntrepriseId);
}


async function update(id, params) {
    const user = await getUser(id);
    // validate
    const usernameChanged = params.email && user.email !== params.email;
    if (usernameChanged && await db.User.findOne({ where: { email: params.email } })) {
        throw 'Username "' + params.email + '" is already taken';
    }

    // Hash du mot de passe s'il a été modifié
    if (params.password && params.password !== user.password) {
        params.password = await bcrypt.hash(params.password, 10);
    } else {
        // Copie de la valeur existante du mot de passe
        params.password = user.password;
    }


    // copy params to user and save
    Object.assign(user, params);
    console.log(params);

    // copy params to user and save
    await user.save();
    await user.addEntreprise(user.EntrepriseId);

    return omitHash(user.get());
}

async function _delete(id) {
    const user = await getUser(id);
    await user.destroy();
}

// helper functions

async function getUser(id) {
    const user = await db.User.findByPk(id,{
        include:[db.Devis, db.Entreprise]
    });
    if (!user) throw 'User not found';
    return user;
}

function omitHash(user) {
    const { password, ...userWithoutHash } = user;
    return userWithoutHash;
}

