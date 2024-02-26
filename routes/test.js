const express = require('express');
const router = express.Router();
const { authJwt } = require("../middlewares");
const controller = require("../controllers/test");

router.get("/test/all", controller.all);
router.get("/test/utilisateur",
    [authJwt.verifyToken],
    controller.utilisateur);
router.get("/test/personne",
    [authJwt.verifyToken, authJwt.isPersonne],
    controller.personne);
router.get("/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.admin);
router.get("/test/initData", controller.initData);

module.exports = router;