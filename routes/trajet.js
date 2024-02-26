const express = require('express');
const router = express.Router();
const { authJwt } = require("../middlewares");
const trajetController = require("../controllers/trajet");

router.get("/listeTrajet",
    [authJwt.verifyToken, authJwt.isPersonne],
    trajetController.readAll);
router.get("/rechercheTrajet",
    [authJwt.verifyToken, authJwt.isPersonne],
    trajetController.search);
router.post("/insertTrajet",
    [authJwt.verifyToken, authJwt.isPersonne],
    trajetController.insert);
router.delete("/deleteTrajet",
    [authJwt.verifyToken, authJwt.isPersonne],
    trajetController.delete);

module.exports = router;