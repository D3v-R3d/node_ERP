const db = require('../_helpers/db');

// CREATE
async function create(data) {
    const { title, ...rest } = data;
    return await db.ImportExcel.create({ title, data: rest });
}


// READ ALL
async function getAll() {
    return await db.ImportExcel.findAll();
}

// READ ONE BY ID
async function getById(id) {
    const importExcel = await db.ImportExcel.findByPk(id);
    return importExcel.data;

}

// UPDATE BY ID
async function updateById(id, data) {
    const importExcel = await  getById(id);
    if (!importExcel) throw new Error('ImportExcel not found');
    return await importExcel.update({ data });
}

// DELETE BY ID
async function deleteById(id) {
    const importExcel = await getById(id);
    if (!importExcel) throw new Error('ImportExcel not found');
    return await importExcel.destroy();
}

module.exports = {
    create,
    getAll,
    getById,
    updateById,
    deleteById
};
