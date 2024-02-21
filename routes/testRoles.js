const { authJwt } = require("../middlewares");
const controller = require("../controllers/testRoles");

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    //! public route
    app.get("/test/all", controller.all);
    //! route test role utilisateur
    app.get(
        "/test/utilisateur",
        [authJwt.verifyToken],
        controller.utilisateur
    );
    //! route test role personne
    app.get(
        "/test/personne",
        [authJwt.verifyToken, authJwt.isPersonne],
        controller.personne
    );
    //! route test role admin
    app.get(
        "/test/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.admin
    );
};
