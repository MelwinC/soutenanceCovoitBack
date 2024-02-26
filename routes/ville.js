const express = require('express');
const router = express.Router();
const { authJwt } = require("../middlewares");
const villeController = require("../controllers/ville");

router.get("/listeVille",
    [authJwt.verifyToken],
    villeController.readAll);
router.post("/insertVille",
    [authJwt.verifyToken, authJwt.isAdmin],
    villeController.insert);
router.delete("/deleteVille",
    [authJwt.verifyToken, authJwt.isAdmin],
    villeController.delete);

module.exports = router;