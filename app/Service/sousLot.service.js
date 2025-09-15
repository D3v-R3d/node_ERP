const db = require('../_helpers/db');
const {where, Sequelize} = require("sequelize");
const lotId = require('./lot.service');





module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    createHiddenSouslot,
    getSousLotHiddenForOuvrage,
    getSousLotHiddenForCout
};

async function getAll() {
    return await db.SousLot.findAll({
        include: [db.OuvrageDuDevis],
    })
}

async function getById(id) {
    return await getSousLot(id);
}


async function update(id, params) {
    const sousLot = await getSousLot(id);
    // validate
    const designationChanged = params.designation && sousLot.designation !== params.designation;
    if (designationChanged && await db.SousLot.findOne({ where: { designation: params.designation } })) {
        throw 'le "' + params.designation + '"est deja enregistrer';
    }

    Object.assign(sousLot, params);
    await sousLot.save();
}

async function _delete(id) {
    await getSousLot(id).then((sousLot =>{
            sousLot.OuvrageDuDevis.forEach(ouvrageDuDevis =>{
                ouvrageDuDevis.CoutDuDevis.forEach(coutDuDevis =>{
                    coutDuDevis.destroy()
                })
                ouvrageDuDevis.destroy()
            })
            sousLot.destroy()
    }));
}

async function getSousLot(id) {
    const sousLot = await db.SousLot.findByPk(id,{
        include: [
            {
                model: db.OuvrageDuDevis,
                include: [db.CoutDuDevis],
            },
        ],
    })
    if (!sousLot) throw 'SousLot Inconnu';
    return sousLot;
}
async function getSousLotHiddenForOuvrage(id) {
    const sousLot = await db.SousLot.findOne({
        include: [
            {
                model: db.Lot,
                include: [{
                    model:db.Devis,
                    where:{id:id}

                }
                ],
            },
        ],
        where:{
            designation: {
                [Sequelize.Op.regexp]: '^SousLotHiddenForOuvrage'
            }
        }
    })
    if (!sousLot) throw 'SousLot Inconnu';
    return sousLot;
}
async function getSousLotHiddenForCout(id) {
    const sousLot = await db.SousLot.findOne({
        include: [
            {
                model: db.Lot,
                include: [{
                    model:db.Devis,
                    where:{id:id}

                }
                ],
            },
        ],
        where:{
            designation: {
                [Sequelize.Op.regexp]: '^SousLotHiddenForCout'
            }
        }
    })
    if (!sousLot) throw 'SousLot Inconnu';
    return sousLot;
}

async function createHiddenSouslot(params,Id){
    console.log("--------------------->",params)
    const [sousLot] = await db.SousLot.findOrCreate({
        where: {
            designation: params.designation
        },
    });

    const souslotId = sousLot.getDataValue('id');
    console.log("lotid=>souslot.service",Id)

    // Vérifie si la combinaison sous-lot / lot existe déjà
    const existingLotSousLot = await db.LotSousLot.findOne({
        where: {
            SousLotId: souslotId,
            LotId: Id
        }
    });

    // Si la combinaison n'existe pas encore, l'ajoute
    if (!existingLotSousLot) {
        await sousLot.addLot(Id);
    }

    return sousLot;
}



// Dans le service de sous-lots
async function create(params,Id) {
// Validate
//     if (await db.SousLot.findOne({ where: { designation: params.designation } })) {
//         throw 'Designation "' + params.designation + '" est déjà enregistrée';
//     }

// Create sous-lot
    const sousLot = new db.SousLot(params);
    await sousLot.save();

// Get sous-lot ID
    const sousLotId = sousLot.getDataValue('id');
    console.log("ID",Id)
    console.log(params)

// Get lot ID from sous-lot model
//     const lotId = sousLotModel.getDataValue('LotId');
    console.log("lotid=>souslot.service",lotId.lotId)
// Create relation between sous-lot and lot
//     const lot = await db.Lot.findByPk(lotId.lotId);
    await sousLot.addLot(Id);

    return sousLot;
}

























