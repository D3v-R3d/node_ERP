const db = require('../_helpers/db');


module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    // createOuvrageCoutDuDevis
};

async function getAll() {
    return await db.CoutDuDevis.findAll({
        include:[db.OuvrageDuDevis]
    });
}

async function getById(id) {
    return await getCoutDuDevis(id);
}

// async function create(params) {
//     console.log("COUT DU DEVIS SERVICE CREATE params: ", params)
//     const coutDuDevis = new db.CoutDuDevis(params);
//
//
//     // save client
//     await coutDuDevis.save();
//     await coutDuDevis.addOuvrage(params.OuvrageId)
// }
// async function createOuvrageCoutDuDevis(ouvrageDuDevisId, params) {
//     console.log("PARAMS COUT DU DEVIS SERVICE",params)
//     const coutDuDevis = new db.CoutDuDevis(params);
//     // save coutDuDevis
//     await coutDuDevis.save();
//     await coutDuDevis.addOuvrageDuDevis(ouvrageDuDevisId.id)
//     return coutDuDevis
// }
async function create(params) {
    // console.log("PARAMS COUT DU DEVIS SERVICE",params)
    // if (await db.CoutDuDevis.findOne({ where: { designation: params.designation } })) {
    //     throw { status: 400, message: 'La désignation "' + params.designation + '" est déjà enregistrée.' };
    // }


    const coutDuDevis = new db.CoutDuDevis(params);
    await coutDuDevis.save();
    return coutDuDevis
}


async function update(id, params) {
    const coutDuDevis = await getCoutDuDevis(id);


    // copy params to user and save
    Object.assign(coutDuDevis, params);
    await coutDuDevis.save();
}

async function _delete(id) {
    const coutDuDevis = await getCoutDuDevis(id);
    await coutDuDevis.destroy();
}

// helper functions

async function getCoutDuDevis(id) {
    const coutDuDevis = await db.CoutDuDevis.findByPk(id,{
        include:db.OuvrageDuDevis,
    });
    if (!coutDuDevis) throw 'cout du devis Inconnue';
    return coutDuDevis;
}
