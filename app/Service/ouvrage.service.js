const db = require('../_helpers/db');
const {where, Sequelize} = require("sequelize");


module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    getAllPrice,
    getAllFraisDeChantiers,
    createSousLotOuvrage,
    getAllExceptFraisDeChantiers,
    getAllWithCout

};

async function getAll(entrepriseId) {
    return await db.Ouvrage.findAll({
        include: [{
            model: db.Cout,
            // include: [db.Fournisseur, db.TypeCout],
            attributes : ['prixUnitaire']
        },{
            model:db.OuvragesElementaires
        },
            {
            model: db.Entreprise,
            attributes : ['denomination']
        }],
        where: {EntrepriseId: entrepriseId}
    })
}
async function getAllWithCout(entrepriseId) {
    return await db.Ouvrage.findAll({
        include: [{
            model: db.Cout,
            include: [db.Fournisseur, db.TypeCout],
        }],
            where: {
                EntrepriseId: entrepriseId,
            }
    })
}

async function getAllExceptFraisDeChantiers(entrepriseId){
    return await db.Ouvrage.findAll({
        include: [{
            model: db.Cout,
            include: [{
                model: db.Fournisseur
            }],
            include: [{
                model: db.TypeCout,
                where: {
                    type: {
                        [Sequelize.Op.notRegexp]: '^Frais'
                    }
                }

            }],
            where: {
                EntrepriseId: entrepriseId,

            }
        }],
    })
}




async function getAllFraisDeChantiers(entrepriseId) {
    return await db.Ouvrage.findAll({
        include: [{
            model: db.Cout,
            include: [{
                model: db.Fournisseur
            }],
            include: [{
                model: db.TypeCout,
                where: {
                    type: {
                        [Sequelize.Op.regexp]: '^Frais'
                    }
                }

            }],
            where: {
                EntrepriseId: entrepriseId,

            }
        }],
    })

}





async function getAllPrice() {
    const ouvrages = await db.Ouvrage.findAll({
        attributes: ['id', [db.Ouvrage.sequelize.fn('SUM', db.Ouvrage.sequelize.col('Cout.montant')), 'prixTotal']],
        include: [
            {
                model: db.OuvrageCout,
                include: [
                    {
                        model: db.Cout,
                    },
                ],
            },
        ],
        //group: ['Ouvrage.id'],
    });
    console.log("ouvrage service getAllPrice :", ouvrages); // affiche le prix total de chaque ouvrage sous forme d'objet avec l'id et le prix total


}


async function getById(id) {
    return await getOuvrage(id);
}


async function update(id, params) {
    const ouvrage = await getOuvrage(id);
    // validate
    const usernameChanged = params.designation && ouvrage.designation !== params.designation;
    if (usernameChanged && await db.Ouvrage.findOne({ where: { designation: params.designation } })) {
        throw 'le "' + params.designation + '"est deja enregistrer';
    }
    // copy params to user and save
    Object.assign(ouvrage, params);
    await ouvrage.save();
}

async function _delete(id) {
    const ouvrage = await getOuvrage(id);
    await ouvrage.destroy();
}

async function getOuvrage(id) {
    const ouvrage = await db.Ouvrage.findByPk(id, {
        include: [
            {
                model: db.OuvragesElementaires,
                include: [
                    {
                        model: db.Cout,
                        include: [db.Fournisseur, db.TypeCout]
                    }
                ]
            },
            {
                model: db.Cout,
                include: [db.Fournisseur, db.TypeCout]
            }
        ],
    });

    if (!ouvrage) throw new Error('Ouvrage Inconnue');
    return ouvrage;
}



async function create(params) {
    if (await db.Ouvrage.findOne({ where: { designation: params.designation } })) {
        throw 'designation "' + params.designation + '" est deja enregistrer';
    }
    const ouvrage = new db.Ouvrage(params);

    // save client
    await ouvrage.save();

}
async function createSousLotOuvrage(data,idOuvrage, idSousLot) {
    console.log("ouvrageId",data.ouvrageId, "sousLotId",data.sousLotId);

    const ouvrage = await db.Ouvrage.findByPk(data.ouvrageId);
    const sousLot = await db.SousLot.findByPk(data.sousLotId);
    await ouvrage.addSousLot(sousLot);

}
