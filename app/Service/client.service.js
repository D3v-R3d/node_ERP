const db = require('../_helpers/db');


module.exports = {
    getAll,
    getById,
    create,
    update,
    getByCompany,
    delete: _delete,
    getAllByEntrepriseId,
    getBydenomination

};

async function getAll() {
    return await db.Client.findAll({
        include: [db.Adresse, db.Devis]
    });
}
async function getAllByEntrepriseId(entrepriseId) {
    return await db.Client.findAll({
        where: {
            EntrepriseId: entrepriseId,
        },
        include:[{
            model:db.Adresse,
        },{
            model:db.Entreprise,
            attributes:['denomination']
        }
        ],
        order: [ [ 'id', 'DESC' ]]
    });
}
async function getBydenomination(denomination) {

    return await db.Client.findAll({
        include: [db.Adresse, db.Devis],
        where: {
            denomination: denomination,
        }
    });
}

async function getByCompany(id, params) {
    return await db.Devis.findAll(id, {
        where: {id: params.EntrepriseId},
        include: [db.Client, db.Adresse]
    })

}

async function getById(id) {
    return await getClient(id);
}

async function create(params) {
    // validate
    if (await db.Client.findOne({where: {denomination: params.denomination}})) {
        throw 'la denomination "' + params.denomination + '" est deja enregistrer';
    }

    const adresse = new db.Adresse(params.Adresse)
    const client = new db.Client(params);
    // save client
    const responseClient = await client.save();
    adresse.ClientId = responseClient.dataValues.id

    await adresse.save();
    return client;
}

async function update(id, params) {
    const client = await getClient(id);
    const adresse = await db.Adresse.findByPk(params.Adresse.id)

    // validate
    const clientChanged = params.denomination && client.denomination !== params.denomination;
    if (clientChanged && await db.Client.findOne({where: {denomination: params.denomination}})) {
        throw 'la denomination : "' + params.denomination + '"est deja enregistrer';
    }

    Object.assign(adresse, params.Adresse)
    await adresse.save();
    // copy params to client and save
    Object.assign(client, params);
    await client.save();
}

async function _delete(id) {
    const client = await getClient(id);
    await client.destroy();
}

// helper functions

async function getClient(id) {
    const client = await db.Client.findByPk(id, {
        include: [db.Adresse, db.Devis]
    });
    if (!client) throw 'Client Inconnue';
    return client;
}