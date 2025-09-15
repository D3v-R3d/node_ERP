const db = require('../_helpers/db');
const {where} = require("sequelize");


module.exports = {
    getAll,
    getById,
    create,
    update,
    createByCout,
    deleteByCoutAndOuvrage
};


async function deleteByCoutAndOuvrage(params){
    console.log(params)
    const coutDuDeviId = parseInt(params.CoutDuDeviId)
    const ouvrageDuDeviId = parseInt(params.OuvrageDuDeviId)
    const ouvrageCoutDuDevis = await db.OuvrageCoutDuDevis.findOne({
        where:{
            CoutDuDeviId : coutDuDeviId,
            OuvrageDuDeviId : ouvrageDuDeviId
        }
    })
    console.log(ouvrageCoutDuDevis)
    return ouvrageCoutDuDevis.destroy()
}


async function getAll() {
    return await db.OuvrageCoutDuDevis.findAll({
    })
}



async function getById(id) {
    return await getOuvrageCoutDuDevis(id);
}



async function getOuvrageCoutDuDevis(id) {
    const ouvrageCoutDuDevis = await db.OuvrageCoutDuDevis.findByPk(id,{});
    if (!ouvrageCoutDuDevis) throw 'N existe pas ';
    return ouvrageCoutDuDevis;
}

async function create(params) {
    console.log("PARAMS",params)
    const ouvrageCoutDuDevis = new db.OuvrageCoutDuDevis(params)
    // save client
    await ouvrageCoutDuDevis.save();
}
async function createByCout(params, data) {
    console.log("PARAMS",params)
    console.log("DATA",data)
    // console.log("ouvrageCout",ouvrageCout)
    const ouvrageDuDevis = await db.OuvrageCoutDuDevis.findByPk(params.OuvrageDuDeviId)
    const coutDuDevis = new db.CoutDuDevis(data)
    await coutDuDevis.save()
    const ouvrageCoutDuDevis = new db.OuvrageCoutDuDevis(params.OuvrageDuDeviId,coutDuDevis, data.OuvrageCout)
    // save client
    await ouvrageCoutDuDevis.save();
}

async function createOuvrageCoutDuDevis(params){

}


async function update(params, data){
    console.log("params from ouvrageCoutDuDevis Service",params)
    const coutDuDeviId = parseInt(params.CoutDuDeviId)
    const ouvrageDuDeviId = parseInt(params.OuvrageDuDeviId)
    console.log("OUVRAGEID",ouvrageDuDeviId)
    console.log("COUTID",coutDuDeviId)
    const ouvrageCoutDuDevis = await db.OuvrageCoutDuDevis.findOne({
        where:{
            CoutDuDeviId : coutDuDeviId,
            OuvrageDuDeviId : ouvrageDuDeviId
        }
    })
    Object.assign(ouvrageCoutDuDevis, data);
    await ouvrageCoutDuDevis.save();
}

