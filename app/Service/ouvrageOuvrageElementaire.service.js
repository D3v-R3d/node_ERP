const db = require('../_helpers/db');
const {where, Sequelize} = require("sequelize");


module.exports = {
    getAll,
    getById,
    create,
    getOuvrageElem,
    // deleteByCoutAndOuvrage,
    // getOuvragePriceById,
    // getAllOuvragePrice,
    update,
    deleteByCoutAndOuvrage,
    createByDesignation
};

async function getAll() {
    return await db.OuvragesOuvragesElementaires.findAll({
    })
}
async function getById(id) {
    return await getOuvrageElem(id);
}
async function getOuvrageElem(id) {
    console.log("id",id)
    const OuvragesOuvragesElementaires = await db.OuvragesOuvragesElementaires.findByPk(id,{});
    if (!OuvragesOuvragesElementaires) throw 'N existe pas ';
    return OuvragesOuvragesElementaires;
}
async function _delete(id) {

    const OuvragesOuvragesElementaires = await getOuvrageElem(id);
    await OuvragesOuvragesElementaires.destroy();
}

async function deleteByCoutAndOuvrage(params){
    console.log('paramsElem',params)
    const ouvrageId = parseInt(params.OuvrageId)
    const ouvrageElemId = parseInt(params.OuvragesElementaireId)
    const ouvrageCout = await db.OuvragesOuvragesElementaires.findOne({
        where:{
            OuvrageId : ouvrageId,
            OuvragesElementaireId : ouvrageElemId
        }
    })
    console.log(ouvrageCout)
    return ouvrageCout.destroy()
}
async function createByDesignation(data, params) {
    console.log("PARAMS",params)
    const ouvrageDuDevis = await db.OuvrageDuDevis.findByPk(params.OuvrageDuDeviId)
    const ouvrage = await db.Ouvrage.findOne({
        where:{designation: ouvrageDuDevis.designation}
    })
    data.OuvrageId = ouvrage.id
    console.log("DATA ", data)


    const ouvrageCout = new db.OuvragesElementairesCouts(data)

    console.log(ouvrage);
    // save client
    await ouvrageCout.save();
}
async function create(params) {
    console.log("PARAMS",params)
    const OuvragesOuvragesElementaires = new db.OuvragesOuvragesElementaires(params)
    // save client
    await OuvragesOuvragesElementaires.save();
}
async function update(params, data) {
    const ouvrageElemId = parseInt(params.OuvragesElementairesId)
    const ouvrageId = parseInt(params.OuvrageId)
    const OuvragesOuvragesElementaires = await db.OuvragesOuvragesElementaires.findOne({
        where:{
            OuvragesElementairesId : ouvrageElemId,
            OuvrageId : ouvrageId
        }
    })

    // console.log("PARAMS",params)
    // const ouvrageCout = await getOuvrageCout(id)
    // // save client
    console.log("console des params",params)
    Object.assign(OuvragesOuvragesElementaires, data);
    await OuvragesOuvragesElementaires.save();
}