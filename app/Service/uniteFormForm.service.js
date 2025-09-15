const db = require('../_helpers/db');

// CREATE
async function create(data) {
    // Créez d'abord l'unité
    const newUnite = await db.UniteForForm.create(data);
    console.log(data.TypeCoutId)
    const typeCout = await db.TypeCout.findByPk(data.TypeCoutId);

    // if (!typeCout) {
    //     throw new Error('TypeCout not found');
    // }

    await newUnite.addTypeCout(typeCout);

    return newUnite;
}



// READ ALL
async function getAll() {
    return await db.UniteForForm.findAll();
}

async function getUniteByLabel(name){
         uniteLabel = await db.UniteForForm.findOne({where:{name}})
    if (!uniteLabel) {
        return null;
    }
    return uniteLabel.id;
}


const { Op } = require('sequelize');

async function getUnitesByTypeCoutId(type) {
    try {
        // Récupérer tous les IDs de TypeCout qui correspondent au type donné
        const typeCouts = await db.TypeCout.findAll({
            where: { type: type },
            attributes: ['id'], // ne sélectionner que l'attribut 'id'
        });
        const typeCoutIds = typeCouts.map(tc => tc.id); // extraire les IDs dans un tableau
        console.log(typeCoutIds)

        // Récupérer toutes les unités correspondantes à ces IDs de TypeCout
        const unites = await db.UniteForForm.findAll({
            include: [{
                model: db.TypeCout,
                where: { id: { [Op.in]: typeCoutIds } }
            }]
        });
        console.log(unites)
        return unites;
    } catch (err) {
        console.error(err);
        throw new Error('Une erreur est survenue lors de la récupération des unités.');
    }
}



async function getByEntrepriseId(entrepriseId) {
    return await db.UniteForForm.findAll({
        where: {
            entrepriseId: entrepriseId
        }
    });
}


async function getById(id) {
    return await db.UniteForForm.findByPk(id);
}

// UPDATE BY ID
async function updateById(id, data) {
    const UniteForForm = await  getById(id);
    if (!UniteForForm) throw new Error('UniteForForm not found');
    return await UniteForForm.update({ data });
}

// DELETE BY ID
async function deleteById(id) {
    const UniteForForm = await getById(id);
    if (!UniteForForm) throw new Error('UniteForForm not found');
    return await UniteForForm.destroy();
}

module.exports = {
    create,
    getAll,
    getById,
    updateById,
    getByEntrepriseId,
    deleteById,
    getUnitesByTypeCoutId,
    getUniteByLabel
};
