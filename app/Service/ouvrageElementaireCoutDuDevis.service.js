const db = require('../_helpers/db');
const {where} = require("sequelize");


module.exports = {
    getAll,
    getById,
    create,
    update,
    createByCout,
    deleteByCoutAndOuvrage,
    createOuvrageElemOuvrageDuDevis
};


async function deleteByCoutAndOuvrage(params){
    console.log(params)
    const coutDuDeviId = parseInt(params.CoutDuDeviId)
    const ouvrageDuDeviId = parseInt(params.OuvrageDuDeviId)
    const ouvrageCoutDuDevis = await db.OuvrElemCoutsDuDevis.findOne({
        where:{
            CoutDuDeviId : coutDuDeviId,
            OuvrageDuDeviId : ouvrageDuDeviId
        }
    })
    console.log(ouvrageCoutDuDevis)
    return ouvrageCoutDuDevis.destroy()
}


async function getAll() {
    return await db.OuvrElemCoutsDuDevis.findAll({
        include:[db.OuvrElemCoutsDuDevis]

    })
}



async function getById(id) {
    return await getOuvrageCoutDuDevis(id);
}



async function getOuvrageCoutDuDevis(id) {
    const ouvrageCoutDuDevis = await db.OuvrElemCoutsDuDevis.findByPk(id,{});
    if (!ouvrageCoutDuDevis) throw 'N existe pas ';
    return ouvrageCoutDuDevis;
}

async function create(params) {
    console.log("PARAMS",params)
    const ouvrageElemCoutDuDevis = new db.OuvrElemCoutsDuDevis(params)
    // save client
    await ouvrageElemCoutDuDevis.save();
}
async function createByCout(params, data) {
    console.log("PARAMS",params)
    console.log("DATA",data)
    // console.log("ouvrageCout",ouvrageCout)
    const ouvrageDuDevis = await db.OuvrElemCoutsDuDevis.findByPk(params.OuvrageDuDeviId)
    const coutDuDevis = new db.CoutDuDevis(data)
    await coutDuDevis.save()
    const ouvrageCoutDuDevis = new db.OuvrElemCoutsDuDevis(params.OuvrageDuDeviId,coutDuDevis, data.OuvrageCout)
    // save client
    await ouvrageCoutDuDevis.save();
}

async function createOuvrageElemOuvrageDuDevis(params){
    console.log("ouvrage params",params)
    const ouvrageOuvrageElem = new db.OuvrOuvrElemDuDevis(params)
    await ouvrageOuvrageElem.save()

}


async function update(params, data){
    console.log(params)
    console.log(data)
    console.log("params from ouvrageCoutDuDevis Service",params)
    const coutDuDeviId = parseInt(params.CoutDuDeviId)
    const OuvrElemDuDeviId = parseInt(params.OuvrElemDuDeviId)
    console.log("OUVRAGEID",OuvrElemDuDeviId)
    console.log("COUTID",coutDuDeviId)
    const ouvrageCoutDuDevis = await db.OuvrElemCoutsDuDevis.findOne({
        where:{
            CoutDuDeviId : coutDuDeviId,
            OuvrElemDuDeviId : OuvrElemDuDeviId
        }
    })
    Object.assign(ouvrageCoutDuDevis, data);
    await ouvrageCoutDuDevis.save();
}

