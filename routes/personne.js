const express = require('express');
const router = express.Router();
const { authJwt, verifyRegister } = require("../middlewares");
const personneController = require("../controllers/personne");

router.post("/insertPersonne",
    [authJwt.verifyToken, verifyRegister.checkDuplicateEmail],
    personneController.insert);
router.get("/selectPersonne",
    [authJwt.verifyToken, authJwt.isPersonne],
    personneController.select);
router.get("/listePersonne",
    [authJwt.verifyToken, authJwt.isPersonne],
    personneController.readAll);
router.put("/updatePersonne",
    [authJwt.verifyToken, verifyRegister.checkDuplicateEmail, authJwt.isPersonne],
    personneController.update);
router.delete("/deletePersonne",
    [authJwt.verifyToken, authJwt.isAdminOrOwner],
    personneController.delete);

module.exports = router;