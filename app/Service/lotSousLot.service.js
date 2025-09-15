const db = require('../_helpers/db');


module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    getLotSousLotBySousLotIdAndLotId
};

async function getAll() {
    return await db.LotSousLot.findAll({
        include:[db.Lot]
    });
}
async function getLotSousLotBySousLotIdAndLotId(sousLotId,lotId) {
    const lotSousLot = await db.LotSousLot.findAll({
        where:{
            SousLotId :sousLotId,
            LotId:lotId
        }
    });
    return lotSousLot
}

async function getById(id) {
    return await getLotSousLot(id);
}

async function create(params) {
    const lotSousLot = new db.LotSousLot(params);

    // save client
    await lotSousLot.save();
}

async function update(id, params) {
    const lotSousLot = await getLotSousLot(id);


    // copy params to user and save
    Object.assign(lotSousLot, params);
    await lotSousLot.save();
}

async function _delete(id) {
    const lotSousLot = await getLotSousLot(id);
    await lotSousLot.destroy();
}

// helper functions

async function getLotSousLot(id) {
    const lotSousLot = await db.LotSousLot.findByPk(id);
    if (!lotSousLot) throw 'lotSousLot Inconnue';
    return lotSousLot;
}