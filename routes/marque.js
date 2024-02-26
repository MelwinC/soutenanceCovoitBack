const express = require('express');
const router = express.Router();
const { authJwt } = require("../middlewares");
const marqueController = require("../controllers/marque");

router.get("/listeMarque",
    [authJwt.verifyToken, authJwt.isPersonne],
    marqueController.readAll);
router.post("/insertMarque",
    [authJwt.verifyToken, authJwt.isAdmin],
    marqueController.insert);
router.delete("/deleteMarque",
    [authJwt.verifyToken, authJwt.isAdmin],
    marqueController.delete);

module.exports = router;