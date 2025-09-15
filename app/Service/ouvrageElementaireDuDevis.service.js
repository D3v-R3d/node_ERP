const db = require('../_helpers/db');


module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    // createSousLotOuvrage
};

async function getAll() {
    return await db.OuvrageElemDuDevis.findAll({
        include: [db.OuvrageDuDevis]

    });
}

async function getById(id) {
    return await getOuvrageDuDevis(id);
}

async function create(params) {
    console.log("ouvrage elementaire DU DEVIS SERVICE CREATE params: ", params)
    const ouvrageElemDuDevis = new db.OuvrageElemDuDevis(params);
    //const entreprise = new db.Entreprise(params, {include: [db.Adresse]});

    // save client
    await ouvrageElemDuDevis.save();
    return ouvrageElemDuDevis
    // await ouvrageDuDevis.addCoutDuDevis(params.CoutDuDeviId)
}

// async function createSousLotOuvrage(data,idOuvrage, idSousLot) {
//     console.log("data from ouvrageDuDevis service ", data)
//     console.log("ouvrageId",data.OuvrageId, "sousLotId",data.SousLotId);
//
//     const ouvrage = await db.OuvrageDuDevis.findByPk(data.OuvrageDuDeviId);
//     const sousLot = await db.SousLot.findByPk(data.SousLotId);
//
//     await ouvrage.addSousLot(sousLot,{ through : {prixOuvrage: ouvrage.prix}});
//
// }

async function update(id, params) {
    console.log("params update ouvrage elementaire du devis service", params)
    const ouvrageDuDevis = await getOuvrageDuDevis(id);


    // copy params to user and save
    Object.assign(ouvrageDuDevis, params);
    await ouvrageDuDevis.save();
    return ouvrageDuDevis
}

async function _delete(id) {
    const ouvrageElementaireDuDevis =  await getOuvrageDuDevis(id)

        // .then((ouvrageDuDevis =>{
        // ouvrageDuDevis.CoutDuDevis.forEach(coutDuDevis =>{
        //     coutDuDevis.destroy()
        // })
    await ouvrageElementaireDuDevis.destroy()
    // }));
    return
}

// helper functions

async function getOuvrageDuDevis(id) {
    const OuvrageElemDuDevis = await db.OuvrageElemDuDevis.findByPk(id,{
        include:[db.CoutDuDevis, db.OuvrageDuDevis]
    });
    if (!OuvrageElemDuDevis) throw 'cout du devis Inconnue';
    return OuvrageElemDuDevis;
}