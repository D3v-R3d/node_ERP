const db = require("../_helpers/db");

module.exports = {
    getAll,
    getById,
    create,
    deleteByUserAndDevis,
};

async function getAll() {
    return await db.UserDevis.findAll({})
}

async function getById(id) {
    return await getDevis(id);
}

async function deleteByUserAndDevis(params){
    console.log(params)
    const userId = parseInt(params.UserId)
    const deviId = parseInt(params.DeviId)
    const userDevis = await db.UserDevis.findOne({
        where:{
            UserId : userId,
            DeviId : deviId
        }
    })
    console.log(userDevis)
    return userDevis.destroy()
}


async function getDevis(id) {
    const userDevis = await db.UserDevis.findByPk(id,{});
    if (!userDevis) throw 'N existe pas ';
    return userDevis;
}


async function create(params) {
    const userDevis = new db.UserDevis(params)
    // save client
    await userDevis.save();
}