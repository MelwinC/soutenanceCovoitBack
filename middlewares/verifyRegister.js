const models = require("../models");
const Compte = models.compte;

checkDuplicateLogin = async (req, res, next) => {
    try{
        if(!req.body.login){
            return res.status(400).send({
                message: "Veuillez remplir tous les champs !"
            });
        }
        const compte = await Compte.findOne({ where: { login: req.body.login } });
        if(compte){
            return res.status(400).send({
                message: "Le login est déjà attribué !"
            });
        }
    } catch (error) {
        res.status(500).send({ message: "NOK" });
    }
};

const verifyRegister = {
    checkDuplicateLogin: checkDuplicateLogin
};

module.exports = verifyRegister;