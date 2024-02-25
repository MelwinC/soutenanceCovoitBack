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

    app.post("/insertTrajet",
        [authJwt.verifyToken, authJwt.isPersonne],
        trajetController.insert);
};
