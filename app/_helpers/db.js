const config = require('../db.config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');
module.exports = db = {};

initialize();

async function initialize() {
    // create db if it doesn't already exist
    const { host, port, user, password, database } = config.database;
    // const connection = await mysql.createConnection({ host, port, user, password });
    // await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

    //
    // sequelize.sync({ force: true }).then(() => {
    //     console.log("Suppression et synchronisation des tables.");
    // });

    // init models and add them to the exported db object
    db.User = require('../models/user.model')(sequelize);
    db.Entreprise = require('../models/entreprise.model')(sequelize)
    db.Ouvrage = require("../models/ouvrage.model")(sequelize)
    db.Cout = require("../models/cout.model")(sequelize);
    db.Devis = require('../models/devis.model')(sequelize);
    db.Client = require('../models/client.model')(sequelize);
    db.UserDevis = require('../models/userDevis.model')(sequelize);
    db.OuvrageCout = require('../models/ouvrageCout.model')(sequelize);
    db.SousLot = require('../models/sousLot.model')(sequelize);
    db.SousLotOuvrage = require('../models/sousLotOuvrage.model')(sequelize);
    db.Lot = require('../models/lot.model')(sequelize);
    // db.SuperAdmin = require('../models/SuperAdmin.model')(sequelize)

    db.Adresse = require('../models/adresse.model')(sequelize);
    db.UserEntreprise = require('../models/userEntreprise.model')(sequelize);
    db.CoutDuDevis = require('../models/coutDuDevis.model')(sequelize);
    db.LotSousLot = require('../models/lotSousLot.model')(sequelize);
    db.TypeCout = require('../models/typeCout.model')(sequelize);
    db.Fournisseur = require('../models/fournisseur.model')(sequelize);
    // db.FournisseurCout = require('../models/fournisseurCout.model')(sequelize)
    db.OuvrageDuDevis = require('../models/ouvrageDuDevis.model')(sequelize)
    db.OuvrageCoutDuDevis = require('../models/ouvrageCoutDuDevis.model')(sequelize)
    db.Notes = require('../models/notes.model')(sequelize)
    db.Logs = require('../models/log.model')(sequelize)
    db.ImportExcel = require('../models/importExcel.model')(sequelize)
    db.UniteForForm = require('../models/uniteForForm.model')(sequelize)
    db.Metre = require('../models/metre.model')(sequelize)


    db.OuvragesElementaires = require('../models/ouvrages-elementaires..model')(sequelize)
    db.OuvragesElementairesCouts = require('../models/ouvrageElementaireCout.model')(sequelize)
    db.OuvragesOuvragesElementaires = require('../models/OuvragesOuvragesElementaires.model')(sequelize)
    db.OuvrageElemDuDevis = require('../models/ouvrageElemDuDevis.model')(sequelize)
    db.OuvrElemCoutsDuDevis = require('../models/ouvrageElementaireCoutDuDevis.model')(sequelize)
    db.OuvrOuvrElemDuDevis = require('../models/ouvrageOuvrageElemDuDevis.model')(sequelize)



    db.Adresse.hasMany(db.Entreprise);
    db.Entreprise.belongsTo(db.Adresse, {foreignKey: "AdresseId"})

    db.Adresse.belongsTo(db.Client,{foreignKey: "ClientId"});
    db.Client.hasMany(db.Adresse)

    db.User.belongsToMany(db.Entreprise, {through: db.UserEntreprise});
    db.Entreprise.belongsToMany(db.User, {through: db.UserEntreprise});

    db.Entreprise.hasMany(db.Devis);
    db.Devis.belongsTo(db.Entreprise, {foreignKey: "EntrepriseId"});

    db.TypeCout.hasMany(db.Cout);
    db.Cout.belongsTo(db.TypeCout, {foreignKey: "TypeCoutId"});

    db.Entreprise.hasMany(db.Cout);
    db.Cout.belongsTo(db.Entreprise, {foreignKey: "EntrepriseId"});


    db.Entreprise.hasMany(db.TypeCout);
    db.TypeCout.belongsTo(db.Entreprise, {foreignKey: "EntrepriseId"});

    db.Entreprise.hasMany(db.Ouvrage);
    db.Ouvrage.belongsTo(db.Entreprise, {foreignKey: "EntrepriseId"});

    //////////////////////////////////////////////////
    db.Fournisseur.hasMany(db.Cout);
    db.Cout.belongsTo(db.Fournisseur, {foreignKey: "FournisseurId"});

    db.Entreprise.hasMany(db.Fournisseur);
    db.Fournisseur.belongsTo(db.Entreprise, {foreignKey: "EntrepriseId"});

        ////NEW
    db.Entreprise.hasMany(db.Client);
    db.Client.belongsTo(db.Entreprise, {foreignKey: "EntrepriseId"})




    // Relation between Ouvrage and Cout => Many to many
    db.Ouvrage.belongsToMany(db.Cout, {through: db.OuvrageCout});
    db.Cout.belongsToMany(db.Ouvrage, {through: db.OuvrageCout});

// Relation between OuvragesElementaires and Cout => Many to many
    db.OuvragesElementaires.belongsToMany(db.Cout, { through: db.OuvragesElementairesCouts });
    db.Cout.belongsToMany(db.OuvragesElementaires, { through: db.OuvragesElementairesCouts });

// Relation between Ouvrage and OuvragesElementaires => Many to many
    db.Ouvrage.belongsToMany(db.OuvragesElementaires, { through: 'OuvragesOuvragesElem' });
    db.OuvragesElementaires.belongsToMany(db.Ouvrage, { through: 'OuvragesOuvragesElem' });

    db.Entreprise.hasMany(db.OuvragesElementaires);
    db.OuvragesElementaires.belongsTo(db.Entreprise, {foreignKey: "EntrepriseId"})
//TEST
    // db.CoutDuDevis.hasMany(db.OuvrageDuDevis);
    // db.OuvrageDuDevis.belongsTo(db.CoutDuDevis, {foreignKey: "CoutDuDeviId"});


    db.OuvrageDuDevis.belongsToMany(db.CoutDuDevis, {through: db.OuvrageCoutDuDevis, onDelete: 'CASCADE'});
    db.CoutDuDevis.belongsToMany(db.OuvrageDuDevis, {through: db.OuvrageCoutDuDevis});

    db.OuvrageDuDevis.belongsToMany(db.OuvrageElemDuDevis, {through: "OuvrOuvrElemDuDevis", onDelete: 'CASCADE'});
    db.OuvrageElemDuDevis.belongsToMany(db.OuvrageDuDevis, {through: "OuvrOuvrElemDuDevis"});

    db.CoutDuDevis.belongsToMany(db.OuvrageElemDuDevis, {through: "OuvrElemCoutsDuDevis", onDelete: 'CASCADE'});
    db.OuvrageElemDuDevis.belongsToMany(db.CoutDuDevis, {through: "OuvrElemCoutsDuDevis"});

    db.TypeCout.belongsToMany(db.UniteForForm, { through: "TypeCoutUniteForm", onDelete: 'CASCADE' });
    db.UniteForForm.belongsToMany(db.TypeCout, { through: "TypeCoutUniteForm" });


    // db.Cout.hasOne(db.CoutDuDevis);
    // db.CoutDuDevis.hasOne(db.Cout);

    // Relation between Ouvrage and SousLot => Many to many
    //old relation
    // db.Ouvrage.belongsToMany(db.SousLot, {through: db.SousLotOuvrage,onDelete: 'CASCADE'});
    // db.SousLot.belongsToMany(db.Ouvrage, {through: db.SousLotOuvrage,onDelete: 'CASCADE'});

    //new relation
    db.OuvrageDuDevis.belongsToMany(db.SousLot, {through: db.SousLotOuvrage});
    db.SousLot.belongsToMany(db.OuvrageDuDevis, {through: db.SousLotOuvrage});

    //Relation between Devis and User  => Many to many
    db.Devis.belongsToMany(db.User,{through: db.UserDevis});
    db.User.belongsToMany(db.Devis,{through:db.UserDevis});

    //Relation between SousLot and Lot  => One to many
    db.Lot.belongsToMany(db.SousLot,{through: db.LotSousLot, onDelete: 'CASCADE'});
    db.SousLot.belongsToMany(db.Lot,{through:db.LotSousLot, onDelete: 'CASCADE'});

    //Relation between Lot and Devis  => One to many
    db.Lot.belongsToMany(db.Devis,{ through: 'LotDevis', onDelete: 'CASCADE'});
    db.Devis.belongsToMany(db.Lot, {through: 'LotDevis',onDelete: 'CASCADE'});

    db.Notes.belongsTo(db.User, {  foreignKey: "UserId",
        onDelete: 'CASCADE' });
    db.User.hasMany(db.Notes, { onDelete: 'CASCADE' });

    // db.Logs.belongsTo(db.User, {  foreignKey: "UserId",
    //     onDelete: 'CASCADE' });
    // db.User.hasMany(db.Logs, { onDelete: 'CASCADE' });

    db.UniteForForm.belongsTo(db.Entreprise, {
        onDelete: 'CASCADE', foreignKey: "EntrepriseId" });
    db.Entreprise.hasMany(db.UniteForForm, { onDelete: 'CASCADE' });

    db.Client.hasMany(db.Devis);
    db.Devis.belongsTo(db.Client, {foreignKey: "ClientId"});

    // db.Metre.hasMany(db.OuvrageDuDevis);
    // db.OuvrageDuDevis.belongsTo(db.Metre, {foreignKey: "MetreId"});

    db.OuvrageDuDevis.hasMany(db.Metre);
    db.Metre.belongsTo(db.OuvrageDuDevis, {foreignKey: "OuvrageDuDeviId"});



    // sync all models with database
    await sequelize.sync({ alter: true });
}
