const express = require('express');
const router = express.Router();
const nodeMailerService = require('../Service/nodeMailer.service')




router.post('/inscription', inscription);
// router.get('/validationCompte/:id', validation);
module.exports = router;


function inscription(req, res, next){
    console.log("inscription controller",req.body)
    nodeMailerService.inscription(req.body).then((inscription) => res.send({
        message: 'inscription réussi',
        inscription: inscription
    }))
        .catch(next);
}