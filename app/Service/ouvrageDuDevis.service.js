const db = require('../_helpers/db');
const {Logger} = require("sequelize/lib/utils/logger");


module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    createSousLotOuvrage
};

async function getAll() {
    return await db.OuvrageDuDevis.findAll({
        include: [db.OuvrageElemDuDevis]

    });
}

async function getById(id) {
    return await getOuvrageDuDevis(id);
}

async function create(params) {
    console.log("ouvrage DU DEVIS SERVICE CREATE params: ", params)
    const ouvrageDuDevis = new db.OuvrageDuDevis(params);
    //const entreprise = new db.Entreprise(params, {include: [db.Adresse]});

    // save client
    await ouvrageDuDevis.save();
    return ouvrageDuDevis
    // await ouvrageDuDevis.addCoutDuDevis(params.CoutDuDeviId)
}

async function createSousLotOuvrage(data, idOuvrage, idSousLot) {
    console.log("data from ouvrageDuDevis service ", data)
    console.log("ouvrageId", data.OuvrageId, "sousLotId", data.SousLotId);

    const ouvrage = await db.OuvrageDuDevis.findByPk(data.OuvrageDuDeviId);
    const sousLot = await db.SousLot.findByPk(data.SousLotId);

    const result = await ouvrage.addSousLot(sousLot, {through: {prixOuvrage: ouvrage.prix}});
    return result;
}

async function update(id, params) {
    const ouvrageDuDevis = await getOuvrageDuDevis(id);

    console.log("params",params)
    // copy params to user and save

    Object.assign(ouvrageDuDevis, params);
    await ouvrageDuDevis.save();
}

async function _delete(id) {
    await getOuvrageDuDevis(id).then((ouvrageDuDevis => {
        // ouvrageDuDevis.CoutDuDevis.forEach(coutDuDevis => {
        //     coutDuDevis.destroy()
        // })
        ouvrageDuDevis.destroy()
    }));
    return "success"
}

// helper functions

async function getOuvrageDuDevis(id) {
    const ouvrageDuDevis = await db.OuvrageDuDevis.findByPk(id, {
        include: [
            {
                model: db.OuvrageElemDuDevis,
                include: [
                    {
                        model: db.CoutDuDevis,

                    }
                ],
            },{
                model: db.SousLot,
                include:[{
                    model:db.Lot,
                    include:[db.Devis]
                }]
            },

            db.CoutDuDevis,

        ]
    });

    if (!ouvrageDuDevis) throw new Error('Ouvrage du devis Inconnue');
    return ouvrageDuDevis;
}

