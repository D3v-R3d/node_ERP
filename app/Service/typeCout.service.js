const db = require('../_helpers/db');
const sequelize = require("sequelize");



module.exports = {
    getAll,
    getById,
    create,
    update,
    getCategorieByType,
    getTypeCoutIdByLabel,
    delete: _delete,
    getAllForList,
    getTypeCoutIdByTypeAndCategorie

};

async function getAll(entrepriseId) {
    return await db.TypeCout.findAll({
        where:{EntrepriseId: entrepriseId}
    });
}
async function getAllForList(entrepriseId) {
    return await db.TypeCout.findAll({
        include:[{
            model:db.Entreprise,
            attributes: ['denomination']
        }],
        where:{EntrepriseId: entrepriseId}
    });
}

async function getById(id) {
    return await getTypeCout(id);
}

async function create(params) {
    const typeCout = new db.TypeCout(params);

    // save typeCout
    await typeCout.save();
    return typeCout;
}

async function update(id, params) {
    const typeCout = await getTypeCout(id);


    // copy params to user and save
    Object.assign(typeCout, params);
    await typeCout.save();
}

async function _delete(id) {
    const typeCout = await getTypeCout(id);
    await typeCout.destroy();
}

// helper functions

async function getTypeCout(id) {
    const typeCout = await db.TypeCout.findByPk(id);
    if (!typeCout) throw 'typeCout Inconnue';
    return typeCout;
}

async function getTypeCoutIdByLabel(categorie) {
    const typeCout = await db.TypeCout.findOne({ where: { categorie } });
    if (!typeCout) {
        return null
    }
    return typeCout.id;
}

async function getTypeCoutIdByTypeAndCategorie(type, categorie) {
    const typeCout = await db.TypeCout.findOne({ where: { type, categorie } });
    if (!typeCout) {
        return null
    }
    return typeCout.id;
}



async function getCategorieByType(type) {
    try {
        const categories = await db.TypeCout.findAll({
            attributes: ['id', 'categorie'],
            where: { type: type },
        });
        return categories.map((category) => {
            return { id: category.id, categorie: category.categorie };
        });
    } catch (err) {
        console.error(err);
        throw new Error('Une erreur est survenue lors de la récupération des catégories.');
    }
}



