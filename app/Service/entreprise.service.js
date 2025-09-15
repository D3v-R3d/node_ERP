const db = require('../_helpers/db');
const sequelize = require("sequelize");


module.exports = {
    getAll,
    getById,
    getClientByEntreprise,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.Entreprise.findAll({
        include:[db.Adresse, db.Devis]
    });
}


async function getById(id) {
    return await getEntreprise(id);
}

async function create(params) {
    console.log('ENTREPRISE SERVICE CREATE ',params)


    if (await db.Entreprise.findOne({ where: { denomination: params.denomination } })) {
        throw 'Denomination "' + params.denomination + '" est deja enregistrer';
    }

    const entreprise = new db.Entreprise(params, {include: [db.Adresse]});
    // console.log(entreprise)
    // save client
    await entreprise.save();
}

async function update(id,params) {
    console.log(id)
    console.log(   params)
    const entreprise = await getEntreprise(id);

    if (params.Adresse) {
        const address = await db.Adresse.findOne({ where: { id: entreprise.AdresseId } });
        if (address) {
            Object.assign(address, params.Adresse);
            await address.save();
        }
    }


    if (params.siret && entreprise.siret !== params.siret) {
        const existingEntreprise = await db.Entreprise.findOne({ where: { siret: params.siret } });
        if (existingEntreprise && existingEntreprise.id !== entreprise.id) {
            throw { status: 409, message: 'Le SIRET "' + params.siret + '" est déjà enregistré' };
        }
    }
    delete params.Adresse;
    // copy params to user and save
    Object.assign(entreprise, params);
    await entreprise.save();
}

async function _delete(id) {
    const entreprise = await getEntreprise(id);
    await entreprise.destroy();
}

// async function getDevisByCompany(id,params) {
//     const entreprise = await db.Entreprise.findByPk(id,{
//         include:db.Devis.findAll({ where: { EntrepriseId: params.id } })
//     });

// }

// helper functions
async function getClientByEntreprise(params) {
    const entrepriseId = params.id;
    const clients = await db.Entreprise.findOne({
        where: { id: entrepriseId },
        include: [
            {
                model: db.Devis,
                include: [
                    {
                        model: db.Client,
                        include: [
                            {
                                model: db.Adresse
                            }
                        ]
                    }
                ]
            }
        ]
    });
    return clients;
}


async function getEntreprise(id) {
    const entreprise = await db.Entreprise.findByPk(id,{
        include:[db.Adresse, db.Devis,db.User],
    });
    if (!entreprise) throw 'Entreprise Inconnue';
    return entreprise;
}

