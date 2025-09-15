const db = require('../_helpers/db');
const {where} = require("sequelize");


module.exports = {
    getAll,
    getById,
    create,
    deleteByOuvrageAndSousLot,
    update,
    getSum
};

async function update(id, params) {
    const sousLotOuvrage = await getSousLotOuvrage(id);
    // validate


    Object.assign(sousLotOuvrage, params);
    await sousLotOuvrage.save();
    return sousLotOuvrage
}


async function getAll() {
    return await db.SousLotOuvrage.findAll({})
}

async function getById(id) {
    return await getSousLotOuvrage(id);
}
async function getSum(id){
    console.log("console log de l'id passer en parametre dans la fonction getSum",id)
    const sumSousLotOuvrage = await db.SousLotOuvrage.sum('prixOuvrage',{
        where:{
            SousLotId:id
        }
    })
    return sumSousLotOuvrage
}

async function deleteByOuvrageAndSousLot(params){
    const sousLotOuvrage = await db.SousLotOuvrage.findOne({
        where:{
            OuvrageId : params.OuvrageId,
            SousLotId : params.SousLotId
        }
    })
    return sousLotOuvrage.destroy()
}


async function getSousLotOuvrage(id) {
    const sousLotOuvrage = await db.SousLotOuvrage.findByPk(id,{});
    if (!sousLotOuvrage) throw 'N existe pas ';
    return sousLotOuvrage;
}


async function create(params) {
    console.log("from sous lot ouvrage servcie", params)
    const sousLotOuvrage = new db.SousLotOuvrage(params)
    // save client
    await sousLotOuvrage.save();
}

