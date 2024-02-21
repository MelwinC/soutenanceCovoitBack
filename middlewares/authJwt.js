const jwt = require("jsonwebtoken");
const models = require("../models");
const Compte = models.compte;
require('dotenv').config();

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({
            message: "Pas de token fourni !"
        });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Accès non autorisé !"
            });
        }
        req.userId = decoded.id;
        next();
    });
};

isAdmin = (req, res, next) => {
    Compte.findByPk(req.userId).then(compte => {
        compte.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].nom === "admin") {
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: "Le role `admin` est nécessaire!"
            });
        });
    });
};

isPersonne = (req, res, next) => {
    Compte.findByPk(req.userId).then(compte => {
        compte.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].nom === "personne") {
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: "Le role `personne` est nécessaire!"
            });
        });
    });
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isPersonne: isPersonne
};

module.exports = authJwt;