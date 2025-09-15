const db = require('../_helpers/db');
const {where, Sequelize} = require("sequelize");


module.exports = {
    getAll,
    getById,
    create,
    deleteByCoutAndOuvrage,
    // getOuvragePriceById,
    // getAllOuvragePrice,
    update,
    createByDesignation
};

async function getAll() {
    return await db.OuvragesElementairesCouts.findAll({
    })
}


// async function getAllOuvragePrice() {
//     const sommeCouts = await db.Ouvrage.findAll({
//         attributes: [[db.Ouvrage.sequelize.fn('SUM', db.Ouvrage.sequelize.col('coutDuDevis.prixUnitaire')), 'sommeCouts']],
//         include: [
//             {
//                 model: db.CoutDuDevis,
//                 include: [
//                     {
//                         model: db.Ouvrage,
//                     },
//                 ],
//             },
//         ],
//         group: ['Ouvrage.id'],
//     });
//     return sommeCouts;
// }


// async function getOuvragePriceById(id) {
//     // const sommeCouts = await db.Ouvrage.findAll({
//     const sommeCouts = await db.Ouvrage.findOne({
//         where: { id: id },
//         attributes: [[db.Ouvrage.sequelize.fn('SUM', db.Ouvrage.sequelize.col('coutDuDevis.prixUnitaire')), 'sommeCouts']],
//         include: [
//             {
//                 model: db.CoutDuDevis,
//                 include: [
//                     {
//                         model: db.Ouvrage,
//                         where: { id: id },
//
//                     },
//                 ],
//             },
//         ],
//         // group: ['Ouvrage.id'],
//
//     });
//     return sommeCouts;
// }

async function getById(id) {
    return await getOuvrageCout(id);
}

async function deleteByCoutAndOuvrage(params){
    console.log(params)
    const coutId = parseInt(params.CoutId)
    const OuvragesElementaireId = parseInt(params.OuvragesElementaireId)
    const ouvrageElemCout = await db.OuvragesElementairesCouts.findOne({
        where:{
            CoutId : coutId,
            OuvragesElementaireId : OuvragesElementaireId
        }
    })
    console.log(ouvrageElemCout)
    return ouvrageElemCout.destroy()
}



async function getOuvrageCout(id) {
    const ouvrageElementaireCout = await db.OuvragesElementairesCouts.findByPk(id,{});
    if (!ouvrageElementaireCout) throw 'N existe pas ';
    return ouvrageElementaireCout;
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
    const ouvrageElementaireCout = new db.OuvragesElementairesCouts(params)
    // save client
    await ouvrageElementaireCout.save();
}





async function update(params, data) {
    console.log("params: ",params)
    const coutId = parseInt(params.CoutId)
    const ouvrageId = parseInt(params.OuvragesElementaireId)
    const ouvrageElementaireCout = await db.OuvragesElementairesCouts.findOne({
        where:{
            CoutId : coutId,
            OuvragesElementaireId : ouvrageId
        }
    })

    // console.log("PARAMS",params)
    // const ouvrageCout = await getOuvrageCout(id)
    // // save client
    console.log("console des params",params)
    Object.assign(ouvrageElementaireCout, data);
    await ouvrageElementaireCout.save();
}

