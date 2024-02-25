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

    app.post("/insertInscription",
        [authJwt.verifyToken, authJwt.isPersonne],
        inscriptionController.insert);
};
