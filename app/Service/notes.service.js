const db = require('../_helpers/db');



module.exports = {
    getAll,
    getById,
    create,
    destroy,
    update,
    getNoteByUser
};

async function getAll() {
    try {
        return await db.Notes.findAll({
            include: [db.User]
        });
    }  catch (error) {
        console.error(error);
        throw error;
    }
}
async function getById(id) {
    return await getNote(id);
}


async function getNote(id) {
    const note = await db.Notes.findByPk(id,{
        include:[db.User]
    });
    if (!note) throw 'Notes not found';
    return note;


}

async function getNoteByUser(id) {
    const note = await db.Notes.findAll({
        where:{
            UserId:id
        }

    });
    if (!note) throw 'Notes not found';
    return note;
}
async function destroy(id) {
    const notes = await getNote(id);
    await notes.destroy();
}
async function update(id, params) {
    const note = await getNote(id)
    Object.assign(note, params);

    await note.save()
}
async function create(note) {
    console.log(note)
    try {
        const notes = await db.Notes.create({
            title: note.title,
            text: note.text,
            typeError: note.typeError,
            optionsTypeError: note.optionsTypeError,
            UserId: note.userId,
            optionsTimestamp:note.optionsTimestamp,
            resolution:false
        });

    } catch (error) {
        console.error(error);
        throw error;
    }



}
