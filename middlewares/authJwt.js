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
                message: "Accès non autorisé / Token expiré !"
            });
        }
        req.id_compte = decoded.id;
        next();
    });
};

isAdmin = async (req, res, next) => {
    try {
        const compte = await Compte.findByPk(req.id_compte);
        if(!compte){
            return res.status(404).send({
                message: "Compte non trouvé !"
            });
        }

        const roles = await compte.getRoles();
        if(!roles){
            return res.status(404).send({
                message: "Roles non trouvés !"
            });
        }
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].nom === "admin") {
                next();
                return;
            }
        }

        res.status(403).send({
            message: "Le role `admin` est nécessaire!"
        });
    } catch (error) {
        res.status(500).send({ message: "NOK" });
    }
};

isPersonne = async (req, res, next) => {
    try {
        const compte = await Compte.findByPk(req.id_compte);
        if(!compte){
            return res.status(404).send({
                message: "Compte non trouvé !"
            });
        }

        const roles = await compte.getRoles();
        if(!roles){
            return res.status(404).send({
                message: "Roles non trouvés !"
            });
        }
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].nom === "personne") {
                next();
                return;
            }
        }

        res.status(403).send({
            message: "Le role `personne` est nécessaire!"
        });
    } catch (error) {
        res.status(500).send({ message: "NOK" });
    }
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isPersonne: isPersonne
};

module.exports = authJwt;