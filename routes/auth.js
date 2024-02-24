const { verifyRegister, authJwt } = require("../middlewares");
const controller = require("../controllers/auth");

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/register",
        [verifyRegister.checkDuplicateLogin],
        controller.register
    );
    app.post(
        "/register/admin",
        [
            authJwt.verifyToken,
            authJwt.isAdmin,
            verifyRegister.checkDuplicateLogin
        ],
        controller.registerAdmin
    );
    app.post("/login", controller.login);
};