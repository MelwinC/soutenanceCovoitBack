const models = require("../models");
const Personne = models.personne;
const Compte = models.compte;
const Ville = models.ville;
const Role = models.role;
const Voiture = models.voiture;
const Marque = models.marque;

exports.insert = async (req, res) => {
  try {
    if (
      !req.body.prenom ||
      !req.body.nom ||
      !req.body.tel ||
      !req.body.id_compte ||
      !req.body.id_ville
    ) {
      return res.status(400).send({ message: "NOK" });
    }

    const compte = await Compte.findByPk(req.body.id_compte);
    if (!compte) {
      return res.status(404).send({ message: "NOK" });
    }

    const ville = await Ville.findByPk(req.body.id_ville);
    if (!ville) {
      return res.status(404).send({ message: "NOK" });
    }

    const email = req.body.email;
    if (!email) {
      return res.status(400).send({ message: "NOK" });
    }
    if (!checkMail(req.body.email)) {
      return res.status(400).send({ message: "NOK" });
    }

    await Personne.create({
      prenom: req.body.prenom,
      nom: req.body.nom,
      tel: req.body.tel,
      email: email,
      id_compte: req.body.id_compte,
      id_ville: req.body.id_ville,
    });
    const role = await Role.findOne({ where: { nom: "personne" } });
    compte.addRoles(role);

    res.status(201).send({ message: "OK" });
  } catch (error) {
    res.status(500).send({ message: "NOK" });
  }
};

exports.select = async (req, res) => {
  try {
    if (!req.body.id) {
      res.status(400).send({ message: "NOK" });
    }

    const personne = await Personne.findByPk(req.body.id);
    if (!personne) {
      return res.status(404).send({ message: "NOK" });
    }

    res.status(200).send({
      message: "OK",
      personne: {
        id: personne.id,
        prenom: personne.prenom,
        nom: personne.nom,
        email: personne.email,
        tel: personne.tel,
        id_compte: personne.id_compte,
        id_ville: personne.id_ville,
      },
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.readAll = async (req, res) => {
  try {
    const personnes = await Personne.findAll();
    if (personnes.length === 0) {
      return res.status(404).send({ message: "NOK" });
    }
    const data = personnes.map((personne) => {
      return {
        id: personne.id,
        prenom: personne.prenom,
        nom: personne.nom,
        email: personne.email,
        tel: personne.tel,
        id_compte: personne.id_compte,
        id_ville: personne.id_ville,
      };
    });
    res.status(200).send({ message: "OK", personnes: data });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    if (!req.body.id_personne) {
      return res.status(400).send({ message: "NOK" });
    }
    const compte = await Compte.findByPk(req.id_compte);
    const personne = await compte.getPersonne();
    if (!personne) {
      return res.status(400).send({ message: "NOK" });
    }
    if (req.body.id_personne !== personne.id) {
      return res.status(403).send({ message: "NOK" });
    }
    if (req.body.email) {
      if (!checkMail(req.body.email)) {
        return res.status(400).send({ message: "NOK" });
      }
      personne.email = req.body.email;
    }
    if (req.body.prenom) {
      personne.prenom = req.body.prenom;
    }
    if (req.body.nom) {
      personne.nom = req.body.nom;
    }
    if (req.body.tel) {
      personne.tel = req.body.tel;
    }
    await updateVoiture(req, res);
    await personne.save();
    res.status(201).send({ message: "OK" });
  } catch (error) {
    res.status(500).send({ message: "NOK" });
  }
};

exports.delete = async (req, res) => {
  try {
    if (!req.body.id_personne) {
      return res.status(400).send({ message: "NOK" });
    }
    const personne = await Personne.findByPk(req.body.id_personne);
    if (!personne) {
      return res.status(400).send({ message: "NOK" });
    }
    await personne.destroy();
    res.status(200).send({ message: "OK" });
  } catch (error) {
    res.status(500).send({ message: "NOK" });
  }
};

const updateVoiture = async (req, res) => {
  let voiture;
  if (req.body.id_marque || req.body.modele || req.body.place) {
    voiture = await Voiture.findOne({
      where: { id_personne: req.body.id_personne },
    });
    if (!voiture) {
      return res.status(400).send({ message: "NOK" });
    }
  }

  if (req.body.id_marque) {
    const marque = await Marque.findByPk(req.body.id_marque);
    if (!marque) {
      return res.status(400).send({ message: "NOK" });
    }
    voiture.id_marque = req.body.id_marque;
  }
  if (req.body.modele) {
    voiture.modele = req.body.modele;
  }
  if (req.body.place) {
    voiture.place = req.body.place;
  }
  if (voiture) {
    await voiture.save();
  }
};

const checkMail = (email) => {
  const emailRegex = /^[a-zA-Z\d._%+-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

exports.getCurrentPersonne = async (req, res) => {
  try {
    const compte = await Compte.findByPk(req.id_compte);
    const personne = await compte.getPersonne();

    res.status(200).send({
      message: "OK",
      personne: {
        id: personne.id,
        prenom: personne.prenom,
        nom: personne.nom,
        email: personne.email,
        tel: personne.tel,
        id_compte: personne.id_compte,
        id_ville: personne.id_ville,
      },
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
