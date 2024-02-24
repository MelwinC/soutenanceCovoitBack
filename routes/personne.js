const { authJwt, verifyRegister } = require("../middlewares");
const personneController = require("../controllers/personne");

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/insertPersonne",
        [authJwt.verifyToken, verifyRegister.checkDuplicateEmail],
        personneController.insert);
    app.get("/selectPersonne",
        [authJwt.verifyToken, authJwt.isPersonne],
        personneController.select);
    app.get("/listePersonne",
        [authJwt.verifyToken, authJwt.isPersonne],
        personneController.readAll);
};
