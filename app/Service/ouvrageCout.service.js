const db = require('../_helpers/db');
const {where, Sequelize} = require("sequelize");


module.exports = {
    getAll,
    getById,
    create,
    deleteByCoutAndOuvrage,
    getOuvragePriceById,
    getAllOuvragePrice,
    update,
    createByDesignation
};

async function getAll() {
    return await db.OuvrageCout.findAll({
    })
}


async function getAllOuvragePrice() {
    const sommeCouts = await db.Ouvrage.findAll({
        attributes: [[db.Ouvrage.sequelize.fn('SUM', db.Ouvrage.sequelize.col('coutDuDevis.prixUnitaire')), 'sommeCouts']],
        include: [
            {
                model: db.CoutDuDevis,
                include: [
                    {
                        model: db.Ouvrage,
                    },
                ],
            },
        ],
        group: ['Ouvrage.id'],
    });
    return sommeCouts;
}


async function getOuvragePriceById(id) {
    // const sommeCouts = await db.Ouvrage.findAll({
    const sommeCouts = await db.Ouvrage.findOne({
        where: { id: id },
        attributes: [[db.Ouvrage.sequelize.fn('SUM', db.Ouvrage.sequelize.col('coutDuDevis.prixUnitaire')), 'sommeCouts']],
        include: [
            {
                model: db.CoutDuDevis,
                include: [
                    {
                        model: db.Ouvrage,
                        where: { id: id },

                    },
                ],
            },
        ],
        // group: ['Ouvrage.id'],

    });
        return sommeCouts;
}

async function getById(id) {
    return await getOuvrageCout(id);
}

async function deleteByCoutAndOuvrage(params){
    console.log(params)
    const coutId = parseInt(params.CoutId)
    const ouvrageId = parseInt(params.OuvrageId)
    const ouvrageCout = await db.OuvrageCout.findOne({
        where:{
            CoutId : coutId,
            OuvrageId : ouvrageId
        }
    })
    console.log(ouvrageCout)
    return ouvrageCout.destroy()
}



async function getOuvrageCout(id) {
    const ouvrageCout = await db.OuvrageCout.findByPk(id,{});
    if (!ouvrageCout) throw 'N existe pas ';
    return ouvrageCout;
}


async function createByDesignation(data, params) {
    console.log("PARAMS",params)
    const ouvrageDuDevis = await db.OuvrageDuDevis.findByPk(params.OuvrageDuDeviId)
    const ouvrage = await db.Ouvrage.findOne({
        where:{designation: ouvrageDuDevis.designation}
    })
    data.OuvrageId = ouvrage.id
    console.log("DATA ", data)


    const ouvrageCout = new db.OuvrageCout(data)

    console.log(ouvrage);
    // save client
      await ouvrageCout.save();
}
async function create(params) {
    console.log("PARAMS",params)
    const ouvrageCout = new db.OuvrageCout(params)
    // save client
      await ouvrageCout.save();
}





async function update(params, data) {
    const coutId = parseInt(params.CoutId)
    const ouvrageId = parseInt(params.OuvrageId)
    const ouvrageCout = await db.OuvrageCout.findOne({
        where:{
            CoutId : coutId,
            OuvrageId : ouvrageId
        }
    })


    // console.log("PARAMS",params)
    // const ouvrageCout = await getOuvrageCout(id)
    // // save client
    console.log("console des params",params)
    Object.assign(ouvrageCout, data);
      await ouvrageCout.save();
}

