const models = require("../models");
const Compte = models.compte;
const Personne = models.personne;

const checkDuplicateLogin = async (req, res, next) => {
  try {
    if (!req.body.login) {
      return res.status(400).send({
        message: "Veuillez remplir tous les champs !",
      });
    }
    const compte = await Compte.findOne({ where: { login: req.body.login } });
    if (compte) {
      return res.status(400).send({
        message: "Le login est déjà attribué !",
      });
    }
    next();
  } catch (error) {
    res.status(500).send({ message: "NOK" });
  }
};

const checkDuplicateEmail = async (req, res, next) => {
  try {
    if (req.body.email) {
      const compte = await Compte.findByPk(req.id_compte);
      const currentPersonne = await compte.getPersonne();
      const personne = await Personne.findOne({
        where: { email: req.body.email },
      });
      if (personne) {
        console.log(currentPersonne);
        if (currentPersonne) {
          if (currentPersonne.id === personne.id) {
            return next();
          }
        } else {
          return res.status(400).send({
            message: "L'email est déjà attribué !",
          });
        }
      }
    }
  } catch (error) {
    res.status(500).send({ message: "NOK" });
  }
};

const verifyRegister = {
  checkDuplicateLogin: checkDuplicateLogin,
  checkDuplicateEmail: checkDuplicateEmail,
};

module.exports = verifyRegister;
