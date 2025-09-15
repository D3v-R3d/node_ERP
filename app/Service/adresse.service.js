const db = require('../_helpers/db');


module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.Adresse.findAll();
}

async function getById(id) {
    return await getAdresse(id);
}

async function create(params) {
    const adresse = new db.Adresse(params);

    // save client
    await adresse.save();
}

async function update(id, params) {
    const adresse = await getAdresse(id);


    // copy params to user and save
    Object.assign(adresse, params);
    await adresse.save();
}

async function _delete(id) {
    const adresse = await getAdresse(id);
    await adresse.destroy();
}

// helper functions

async function getAdresse(id) {
    const adresse = await db.Adresse.findByPk(id);
    if (!adresse) throw 'Adresse Inconnue';
    return adresse;
}