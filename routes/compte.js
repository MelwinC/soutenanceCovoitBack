const express = require('express');
const router = express.Router();
const { verifyRegister, authJwt } = require("../middlewares");
const controller = require("../controllers/compte");

router.post("/register",
    [verifyRegister.checkDuplicateLogin],
    controller.register);
router.post("/register/admin",
    [authJwt.verifyToken, authJwt.isAdmin, verifyRegister.checkDuplicateLogin],
    controller.registerAdmin
);
router.post("/login", controller.login);

module.exports = router;