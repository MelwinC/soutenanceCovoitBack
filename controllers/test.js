const models = require('../models');
const initializeData = require('../database/initializeData');

exports.all = (req, res) => {
    res.status(200).send({ message: "Accessible publiquement" });
};

exports.utilisateur = (req, res) => {
    res.status(200).send({ message: "Accessible au role `utilisateur`" });
};

exports.personne = (req, res) => {
    res.status(200).send({ message: "Accessible au role `personne`" });
};

exports.admin = (req, res) => {
    res.status(200).send({ message: "Accessible au role `admin`" });
};

exports.initData = (req, res) => {
    models.sequelize.sync({force:true}).then(() => {
      initializeData().then(() => {
          res.status(200).send({ message: "The database has been dropped / re-created & data has been initialized" });
      });
    });
};