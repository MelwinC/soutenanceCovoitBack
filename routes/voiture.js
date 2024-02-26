const express = require('express');
const router = express.Router();
const { authJwt } = require("../middlewares");
const voitureController = require("../controllers/voiture");

router.get("/listeVoiture",
    [authJwt.verifyToken, authJwt.isPersonne],
    voitureController.readAll);
router.post("/insertVoiture",
    [authJwt.verifyToken, authJwt.isPersonne],
    voitureController.insert);
router.delete("/deleteVoiture",
    [authJwt.verifyToken, authJwt.isPersonne],
    voitureController.delete);

module.exports = router;