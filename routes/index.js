const express = require('express');
const router = express.Router();
const compteRoutes = require('./compte');
const testRoutes = require('./test');
const villeRoutes = require('./ville');
const marqueRoutes = require('./marque');
const personneRoutes = require('./personne');
const voitureRoutes = require('./voiture');
const trajetRoutes = require('./trajet');
const inscriptionRoutes = require('./inscription');

router.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.use('/', compteRoutes, testRoutes, villeRoutes, marqueRoutes, personneRoutes, voitureRoutes, trajetRoutes, inscriptionRoutes);

module.exports = router;