const db = require('../_helpers/db');
const {where, Sequelize} = require("sequelize");


module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    getSousLotByLotId,
    createLotFraisDeChantier,
    createHiddenlot,
    getLotHiddenForOuvrage,
    getLotHiddenForCout,

};

async function getAll() {
    return await db.Lot.findAll({
        include: [db.Devis, db.SousLot]

    })
}

// async function getFraisDeChantier(deviId) {
//
//     const lot = await db.Lot.findOne({
//         include:[db.Devis, db.SousLot],
//         where:{designation : "Frais de chantier " + deviId}
//     })
//     return lot;
//
//     // return await db.LotDevis.findOne({
//     //     where:{DeviId: deviId,LotId : lot.id }
//     // })
// }

async function getById(id) {
    return await getLot(id);
}


async function update(id, params) {
    const lot = await getLot(id);

    // validate
    const usernameChanged = params.designation && lot.designation !== params.designation;
    if (usernameChanged && await db.Lot.findOne({where: {designation: params.designation}})) {
        throw 'le "' + params.designation + '"est deja enregistrer';
    }

    // copy params to user and save
    Object.assign(lot, params);
    await lot.save();
}

async function _delete(id) {
    await getLot(id).then((lot => {
        // lot.SousLots.forEach(sousLot => {
        //     sousLot.OuvrageDuDevis.forEach(ouvrageDuDevis => {
        //         ouvrageDuDevis.CoutDuDevis.forEach(coutDuDevis => {
        //             coutDuDevis.destroy()
        //         })
        //         ouvrageDuDevis.destroy()
        //     })
        //     sousLot.destroy()
        // })
        lot.destroy()
    }));
}

async function getLot(id) {
    const lot = await db.Lot.findByPk(id, {
        include: [
            db.Devis,
            {
                model: db.SousLot,
                include: [
                    {
                        model: db.OuvrageDuDevis,
                        include: [db.CoutDuDevis],
                    },
                ],
            },
        ],
    });

    if (!lot) throw 'LOT Inconnue';
    return lot;
}

async function getLotHiddenForOuvrage(id) {
    const lot = await db.Lot.findOne({
        include: [
            {
                model:db.Devis,
                where:{id:id}
            }
        ],
        where:{
            designation: {
        [Sequelize.Op.regexp]: '^LotHiddenForOuvrage'
    }}
    });

    if (!lot) throw 'LOT Inconnue';
    return lot;
}
async function getLotHiddenForCout(id) {
    const lot = await db.Lot.findOne({
        include: [
            {
                model:db.Devis,
                where:{id:id}
            }
        ],
        where:{
            designation: {
                [Sequelize.Op.regexp]: '^LotHiddenForCout'
            }}
    });

    if (!lot) throw 'LOT Inconnue';
    return lot;
}

async function getSousLotByLotId(id) {
    const lot = await db.Lot.findByPk(id, {
        include: [
            {
                model: db.SousLot
            },
        ],
    });

    if (!lot) throw 'LOT Inconnue';
    return lot;
}


async function createHiddenlot(params) {
    console.log(params)
    const [lot] = await db.Lot.findOrCreate({
        where: {
            designation: params.designation,
        }
    })
    const lotId = lot.getDataValue('id');
    console.log("lotid=>lot.service", lotId)
    const devisId = params.devisId;

// Add relation to Devis table
    const devis = await db.Devis.findByPk(devisId);
    await devis.addLot(lot);

// Return lot
    return {lot: lot, lotId: lotId};
}


async function createLotFraisDeChantier(params) {
// Validate
//     if (await db.Lot.findOne({ where: { designation: params.designation } })) {
//         throw 'Designation "' + params.designation + '" est déjà enregistrée';
//     }

// Create lot
    console.log(params)
    const [lot] = await db.Lot.findOrCreate({
        where: {designation: params.designation},
        defaults: params,
        returning: true // <-- Indique à Sequelize de retourner les données du lot créé
    });
    console.log("LOT", lot)
// Get lot ID
    const lotId = lot.getDataValue('id');
    console.log("lotid=>lot.service", lotId)
    const devisId = params.devisId;

// Add relation to Devis table
    const devis = await db.Devis.findByPk(devisId);
    await devis.addLot(lot);

// Set lot ID on sous-lot model
    module.exports.lotId = lotId;

// Return lot
    return {lot: lot, lotId: lotId};
}

async function create(params) {
// Validate
//     if (await db.Lot.findOne({ where: { designation: params.designation } })) {
//         throw 'Designation "' + params.designation + '" est déjà enregistrée';
//     }

// Create lot
    console.log(params)
    const lot = new db.Lot(params);
    await lot.save();
    console.log("LOT", lot)
// Get lot ID
    const lotId = lot.getDataValue('id');
    console.log("lotid=>lot.service", lotId)
    const devisId = params.devisId;

// Add relation to Devis table
    const devis = await db.Devis.findByPk(devisId);
    await devis.addLot(lot);

// Set lot ID on sous-lot model
    module.exports.lotId = lotId;

// Return lot
    return {lot: lot, lotId: lotId};
}
































