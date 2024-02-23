const { authJwt } = require("../middlewares");
const marqueController = require("../controllers/marque");

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/listeMarque",
        [authJwt.verifyToken, authJwt.isPersonne],
        marqueController.readAll);
    app.post("/insertMarque",
        [authJwt.verifyToken, authJwt.isAdmin],
        marqueController.insert);
};
