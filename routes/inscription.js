const { authJwt } = require("../middlewares");
const inscriptionController = require("../controllers/inscription");

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/listeInscription",
        [authJwt.verifyToken, authJwt.isPersonne],
        inscriptionController.readAll);
    app.get("/listeInscriptionConducteur",
        [authJwt.verifyToken, authJwt.isPersonne],
        inscriptionController.readConducteur);
    app.get("/listeInscriptionUser",
        [authJwt.verifyToken, authJwt.isPersonne],
        inscriptionController.readPassager);
    app.post("/insertInscription",
        [authJwt.verifyToken, authJwt.isPersonne],
        inscriptionController.insert);
};
