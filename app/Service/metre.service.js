const db = require('../_helpers/db');


module.exports = {
    getAll,
    getAllByOuvrage,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    console.log('metre get all ')
    return await db.Metre.findAll({
    });
}
async function getAllByOuvrage(id) {
    console.log('metre get all ')
    return await db.Metre.findAll({
        include:db.OuvrageDuDevis,
        where:{OuvrageDuDeviId:id}
        // include: {
        //     model: db.OuvrageDuDevis,
        //     where: {
        //         id: id
        //     }
        // }
    });
}

async function getById(id) {
    return await getMetre(id);
}

async function create(params) {
    console.log(params)
    const metre = new db.Metre(params);

    // save client
    await metre.save();
    return metre;
}

async function update(id, params) {
    const metre = await getMetre(id);


    // copy params to user and save
    Object.assign(metre, params);
    await metre.save();
}

async function _delete(id) {
    const metre = await getMetre(id);
    await metre.destroy();
}

// helper functions

async function getMetre(id) {
    const metre = await db.Metre.findByPk(id);
    if (!metre) throw 'metre Inconnue';
    return metre;
}