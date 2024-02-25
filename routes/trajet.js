const { authJwt } = require("../middlewares");
const trajetController = require("../controllers/trajet");

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/listeTrajet",
        [authJwt.verifyToken, authJwt.isPersonne],
        trajetController.readAll);
    app.get("/rechercheTrajet",
        [authJwt.verifyToken, authJwt.isPersonne],
        trajetController.search);
    app.post("/insertTrajet",
        [authJwt.verifyToken, authJwt.isPersonne],
        trajetController.insert);
    app.delete("/deleteTrajet",
        [authJwt.verifyToken, authJwt.isPersonne],
        trajetController.delete);
};
