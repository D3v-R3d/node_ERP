const db = require('../_helpers/db');


module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    updatetest
};

async function getAll() {
    return await db.FournisseurCout.findAll();
}

async function getById(id) {
    return await getFournisseurCout(id);
}

async function create(params) {
    console.log("FOURNISSEUR COUT SERVICE CREATE, PARAMS :",params)
    const fournisseurCout = new db.FournisseurCout(params);

    // save client
    await fournisseurCout.save();
}

async function update(id, params) {
    const fournisseurCout = await getFournisseurCout(id);


    // copy params to user and save
    Object.assign(fournisseurCout, params);
    await fournisseurCout.save();
}
async function updatetest(CoutId, FournisseurId, params) {
    console.log('test')
    const fournisseurCout = await db.FournisseurCout.findOne({
        where:{
            CoutId:CoutId,
            FournisseurId:FournisseurId
        }
    });
    if (!fournisseurCout) throw 'FournisseurCout Inconnue';
    console.log("params: ",params)
    // copy params to user and save
    Object.assign(fournisseurCout, params);
    await fournisseurCout.save();
}

async function _delete(id) {
    const fournisseurCout = await getFournisseurCout(id);
    await fournisseurCout.destroy();
}

// helper functions

async function getFournisseurCout(id) {
    const fournisseurCout = await db.FournisseurCout.findByPk(id);
    if (!fournisseurCout) throw 'FournisseurCout Inconnue';
    return fournisseurCout;
}