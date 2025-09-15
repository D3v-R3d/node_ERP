const db = require('../_helpers/db');


module.exports = {
    getAll,
    getById,
    create,
    update,
    getFournisseurIdByName,
    delete: _delete,
    getAllForList
};

async function getAll(entrepriseId){
    return await db.Fournisseur.findAll({
        include:[db.Entreprise],
        where: {EntrepriseId: entrepriseId}
    });
}
async function getAllForList(entrepriseId){
    return await db.Fournisseur.findAll({
        include:[{
            model:db.Entreprise,
            attributes:['denomination']
        }],
        where: {EntrepriseId: entrepriseId}
    });
}

async function getById(id) {
    return await getFournisseur(id);
}

async function getFournisseurIdByName(commercialName) {
    const fourn = await db.Fournisseur.findOne({ where: { commercialName } });
    if (!fourn) {
        return null;
    }
    return fourn.id;
}

async function create(params) {
    const fournisseur = new db.Fournisseur(params);

    // save client
    await fournisseur.save();
}

async function update(id, params) {
    const fournisseur = await getFournisseur(id);

    // copy params to user and save
    Object.assign(fournisseur, params);
    await fournisseur.save();
}

async function _delete(id) {
    const fournisseur = await getFournisseur(id);
    await fournisseur.destroy();
}

// helper functions

async function getFournisseur(id) {
    const fournisseur = await db.Fournisseur.findByPk(id);
    if (!fournisseur) throw 'Adresse Inconnue';
    return fournisseur;
}