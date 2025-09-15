const db = require('../_helpers/db');
const {where, Sequelize} = require("sequelize");


module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,


};

async function getAll(entrepriseId) {
    return await db.OuvragesElementaires.findAll({
        include: [{
            model: db.Cout,
            include: [db.Fournisseur, db.TypeCout]
        },{
            model: db.Entreprise,
            attributes : ['denomination']
        }
        ],
        where: {EntrepriseId: entrepriseId}
        // include: [db.CoutDuDevis, db.SousLot],
    })
}

async function create(params) {
    if (await db.OuvragesElementaires.findOne({ where: { designation: params.designation }, returning: true })) {
        throw 'designation "' + params.designation + '" est deja enregistrer';
    }
    const OuvragesElementaires = new db.OuvragesElementaires(params);

    // save client
    await OuvragesElementaires.save();
    return OuvragesElementaires;

}

async function getById(id) {
    return await getOuvrageElementaires(id);
}


async function update(id, params) {
    console.log("params",params)
    console.log("id",id)
    const OuvragesElementaires = await getOuvrageElementaires(id);
    // validate
    const usernameChanged = params.designation && OuvragesElementaires.designation !== params.designation;
    if (usernameChanged && await db.OuvragesElementaires.findOne({ where: { designation: params.designation } })) {
        throw 'le "' + params.designation + '"est deja enregistrer';
    }
    // copy params to user and save
    Object.assign(OuvragesElementaires, params);
    await OuvragesElementaires.save();
}

async function _delete(id) {
    const OuvragesElementaires = await getOuvrageElementaires(id);
    await OuvragesElementaires.destroy();
}

async function getOuvrageElementaires(id) {
    const OuvragesElementaires = await db.OuvragesElementaires.findByPk(id
        ,{
            include: [
                {
                    model: db.Cout,
                    include: [db.Fournisseur, db.TypeCout]
                }
            ],

            // include: [db.CoutDuDevis, db.SousLot],
        }
    );
    if (!OuvragesElementaires) throw 'Ouvrage Inconnue';
    return OuvragesElementaires;
}

