const jwt = require("jsonwebtoken");
const models = require("../models");
const Compte = models.compte;
require('dotenv').config();

const verifyToken = (req, res, next) => {
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

const isAdmin = async (req, res, next) => {
    try {
        const compte = await Compte.findByPk(req.id_compte);
        if(!compte){
            return res.status(404).send({
                message: "Compte non trouvé !"
            });
        }
        const roles = await compte.getRoles();
        const admin = roles.find(role => role.nom === 'admin');
        if(admin){
            next();
        } else {
            res.status(403).send({ message: "Le role `admin` est nécessaire !" });
        }
    } catch (error) {
        res.status(500).send({ message: "NOK" });
    }
};

const isPersonne = async (req, res, next) => {
    try {
        const compte = await Compte.findByPk(req.id_compte);
        if(!compte){
            return res.status(404).send({
                message: "Compte non trouvé !"
            });
        }
        const roles = await compte.getRoles();
        const rolePersonne = roles.find(role => role.nom === 'personne');
        if(rolePersonne){
            next();
        } else {
            res.status(403).send({
                message: "Le role `personne` est nécessaire!"
            });
        }
    } catch (error) {
        res.status(500).send({ message: "NOK" });
    }
};

const isAdminOrOwner = async (req, res, next) => {
    try {
        const compte = await Compte.findByPk(req.id_compte, {
            include: [{
                model: models.personne
            }]
        });
        if (!compte) {
            return res.status(404).send({ message: "Compte non trouvé !" });
        }
        const personne = compte.personne;
        if (!personne) {
            return res.status(404).send({ message: "Personne non trouvée !" });
        }
        const roles = await compte.getRoles();
        const admin = roles.find(role => role.nom === 'admin');
        const owner = (req.body.id_personne === personne.id);
        if(owner || admin){
            next();
        } else {
            res.status(403).send({ message: "Vous devez être propriétaire ou `admin` !" });
        }
    } catch (error) {
        res.status(500).send({ message: "NOK" });
    }
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isPersonne: isPersonne,
    isAdminOrOwner: isAdminOrOwnerg
};

module.exports = authJwt;