const cron = require('node-cron');
const mysql = require('mysql2/promise');

async function startCronJob() {
    // Configurez votre connexion MySQL ici
    const db = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'erp'
    });

    cron.schedule('0 0 * * *', async () => {
        console.log('Cette tâche s’exécute tout les jours a 00h00');
        const query = "DELETE FROM logs WHERE createdAt < NOW() - INTERVAL 30 DAY";

        try {
            const [result] = await db.execute(query);
            console.log("Nombre de ligne effacéés " + result.affectedRows);
        } catch(err) {
            console.error(err);
        }

        // Pour sauvegarder la base de données, utilisez des outils spécifiques comme mysqldump.
        // MySQL n'a pas de commande intégrée pour sauvegarder la base de données.
    }, {
        scheduled: true,
        timezone: "Europe/Paris"
    });
}

startCronJob().catch(console.error);
