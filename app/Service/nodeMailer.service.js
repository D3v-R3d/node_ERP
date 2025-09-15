const nodemailer = require('nodemailer');


module.exports = {
    inscription,
    // validation
};

async function inscription(to, id) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.sendgrid.net',
        port: 587,
        secure: false,
        auth: {
            user: 'apikey',
            pass: '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'
        }
    });

    const mailOptions = {
        //envoyeur
        // from: 'no-reply@erp.biopura.fr',
        from: 'erp.biopura@gmail.com',
        to: 'Aubrii@hotmail.fr',
        subject: 'Confirmez votre compte',
        text: `Confirmez votre compte en cliquant sur ce lien : http://votre-application.com/validation-compte/${id}`,
    };

    await transporter.sendMail(mailOptions);

}
