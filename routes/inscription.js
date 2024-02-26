const express = require('express');
const router = express.Router();
const { authJwt } = require("../middlewares");
const inscriptionController = require("../controllers/inscription");

router.get("/listeInscription",
    [authJwt.verifyToken, authJwt.isPersonne],
    inscriptionController.readAll);
router.get("/listeInscriptionConducteur",
    [authJwt.verifyToken, authJwt.isPersonne],
    inscriptionController.readConducteur);
router.get("/listeInscriptionUser",
    [authJwt.verifyToken, authJwt.isPersonne],
    inscriptionController.readPassager);
router.post("/insertInscription",
    [authJwt.verifyToken, authJwt.isPersonne],
    inscriptionController.insert);
router.delete("/deleteInscription",
    [authJwt.verifyToken, authJwt.isPersonne],
    inscriptionController.delete);

module.exports = router;