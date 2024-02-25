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

    app.get("/listeVille",
        [authJwt.verifyToken],
        villeController.readAll);
    app.post("/insertVille",
        [authJwt.verifyToken, authJwt.isAdmin],
        villeController.insert);
    app.delete("/deleteVille",
        [authJwt.verifyToken, authJwt.isAdmin],
        villeController.delete);
};
