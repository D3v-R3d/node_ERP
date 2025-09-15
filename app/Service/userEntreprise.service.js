const db = require('../_helpers/db');


module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.UserEntreprise.findAll();
}

async function getById(id) {
    return await getUserEntreprise(id);
}

async function create(params) {
    const userEntreprise = new db.UserEntreprise(params);

    // save client
    await userEntreprise.save();
}

async function update(id, params) {
    const userEntreprise = await getUserEntreprise(id);


    // copy params to user and save
    Object.assign(userEntreprise, params);
    await userEntreprise.save();
}

async function _delete(id) {
    const userEntreprise = await getUserEntreprise(id);
    await userEntreprise.destroy();
}

// helper functions

async function getUserEntreprise(id) {
    const userEntreprise = await db.UserEntreprise.findByPk(id);
    if (!userEntreprise) throw 'userEntreprise Inconnue';
    return userEntreprise;
}