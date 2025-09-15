const db = require('../_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    getAllFraisDeChantiers,
    getAllCouts,
    getLast,
    getAllForList,
    getCoutByLabel
};

async function getAll(entrepriseId) {
    return await db.Cout.findAll({
        include:[db.TypeCout, db.Fournisseur],
        where:{EntrepriseId: entrepriseId}
    });
}
async function getCoutByLabel(designation){
    const cout= await db.Cout.findOne({where:{designation}})
    if (!cout){
        return null;
    }
    return cout
}
async function getAllForList(entrepriseId) {
    return await db.Cout.findAll({
        include:[{
            model:db.Fournisseur,
            attributes:['commercialName']
        },{
            model:db.TypeCout,
            attributes:['categorie', 'type']
        },{
            model:db.Entreprise,
            attributes:['denomination']
        }],
        where:{EntrepriseId: entrepriseId}
    });
}
async function getLast() {
    return await db.Cout.findAll({
        limit:1,
        order: [ [ 'createdAt', 'DESC' ]]
    });
}

async function getAllCouts() {
    return await db.Cout.findAll({
        include:[db.Ouvrage],
        where:{isCout: true}
    })
}



async function getAllFraisDeChantiers() {
    return await db.Cout.findAll({
        include:[db.Ouvrage],
        where:{isFraisDeChantier: true}
    })
}

async function getById(id) {
    return await getCout(id);
}


async function update(id, params) {
    const cout = await getCout(id);
    // validate
    const coutchanged = params.designation && cout.designation !== params.designation;
    if (coutchanged && await db.Cout.findOne({ where:
            { designation: params.designation }

    })) {
        throw 'le "' + params.designation + '"est deja enregistrer';
    }

    Object.assign(cout, params);
    await cout.save();
}

async function _delete(id) {
    const cout = await getCout(id);
    await cout.destroy();
}

async function getCout(id) {
    const cout = await db.Cout.findByPk(id,{
        include:[db.Fournisseur,db.TypeCout]
    });
    if (!cout) throw 'cout Inconnue';
    return cout;
}


async function create(params) {
    // validate
    console.log("PARAMS COUT SERVICE",params)
    if (await db.Cout.findOne({ where: { designation: params.designation } })) {
        throw 'designation "' + params.designation + '" est deja enregistrer';
    }

    const cout = new db.Cout(params);
    // await user.addEntreprise(params.EntrepriseId);

    // save client
    await cout.save();
    return cout;
    // await cout.addFournisseur(params.FournisseurId);
}

