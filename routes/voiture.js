const { authJwt } = require("../middlewares");
const voitureController = require("../controllers/voiture");

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/listeVoiture",
        [authJwt.verifyToken, authJwt.isPersonne],
        voitureController.readAll);
    app.post("/insertVoiture",
        [authJwt.verifyToken, authJwt.isPersonne],
        voitureController.insert);
    app.delete("/deleteVoiture",
        [authJwt.verifyToken, authJwt.isPersonne],
        voitureController.delete);
};
