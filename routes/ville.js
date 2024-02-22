const { authJwt } = require("../middlewares");
const villeController = require("../controllers/ville");

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    //! route pour insérer une ville accès: admin
    app.post("/insertVille",
        [authJwt.verifyToken, authJwt.isAdmin],
        villeController.add);
};
