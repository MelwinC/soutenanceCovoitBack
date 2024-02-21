const models = require("../models");
const roles = ["utilisateur", "personne", "admin"];
const Compte = models.compte;

checkDuplicateLogin = (req, res, next) => {
    //! find by login
    if(!req.body.login){
        res.status(400).send({
            message: "Veuillez remplir tous les champs !"
        });
    } else {
        Compte.findOne({
            where: {
                login: req.body.login
            }
        }).then(compte => {
            if (compte) {
                res.status(400).send({
                    message: "Le login est déjà attribué !"
                });
                return;
            }
            next();
        });
    }
};

checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!roles.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: "Le role n'existe pas = " + req.body.roles[i]
                });
                return;
            }
        }
    }
    next();
};

const verifyRegister = {
    checkDuplicateLogin: checkDuplicateLogin,
    checkRolesExisted: checkRolesExisted
};

module.exports = verifyRegister;