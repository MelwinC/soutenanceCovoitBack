const models = require("../models");
const Personne = models.personne;
const Trajet = models.trajet;
const Ville = models.ville;

exports.insert = async (req, res) => {
  try {
    if (!req.body.id_personne || !req.body.id_trajet) {
      return res.status(400).send({ message: "Paramètres insuffisants" });
    }
    const compte = await models.compte.findByPk(req.id_compte);
    const personne = await compte.getPersonne();
    if (!personne) {
      return res.status(400).send({
        message: "Aucune personne trouvée avec cet identifiant de compte.",
      });
    }
    if (personne.id !== req.body.id_personne) {
      return res.status(400).send({ message: "NOK" });
    }
    const trajet = await Trajet.findByPk(req.body.id_trajet);
    if (!trajet) {
      return res.status(400).send({ message: "Trajet non trouvé." });
    }
    if (trajet.dateT < new Date()) {
      return res.status(400).send({ message: "Trajet déjà passé." });
    }
    if (trajet.id_personne === req.body.id_personne) {
      return res.status(400).send({
        message: "Vous ne pouvez pas vous inscrire à votre propre trajet.",
      });
    }
    const inscriptions = await personne.getTrajets();
    for (const inscription of inscriptions) {
      console.log(inscription);
      if (inscription.id === req.body.id_trajet) {
        return res
          .status(400)
          .send({ message: "Vous êtes déjà inscrit à ce trajet." });
      }
    }
    const placesDispo = await getPlacesDispo(trajet);
    if (placesDispo === 0) {
      return res.status(400).send({ message: "Plus de places disponibles." });
    }
    await personne.addTrajets([req.body.id_trajet]);
    res.status(201).send({ message: "OK" });
  } catch (error) {
    res.status(500).send({ message: "NOK" });
  }
};

exports.readAll = async (req, res) => {
  try {
    const personne = await Personne.findOne({
      where: { id_compte: req.id_compte },
    });

    const trajetsConducteur = await Trajet.findAll({
      where: { id_personne: personne.id },
    });

    const trajetsPassager = await personne.getTrajets();

    const inscriptionsConducteur = trajetsConducteur.map(async (trajet) => {
      return {
        trajet: trajet,
      };
    });

    const inscriptionsPassager = await Promise.all(
      trajetsPassager.map(async (trajet) => {
        const villeDep = await Ville.findByPk(trajet.id_ville_dep);
        const villeArr = await Ville.findByPk(trajet.id_ville_arr);
        const personne = await Personne.findByPk(trajet.id_personne);
        return {
          id: trajet.id,
          kms: trajet.kms,
          dateT: trajet.dateT,
          place_proposees: trajet.place_proposees,
          personne: personne,
          villeDep: villeDep,
          villeArr: villeArr,
          place_dispo: trajet.place_proposees - (await trajet.countPersonnes()),
        };
      })
    );

    res
      .status(200)
      .send({ message: "OK", inscriptionsConducteur, inscriptionsPassager });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "NOK" });
  }
};

exports.readConducteur = async (req, res) => {
  try {
    const personne = await Personne.findOne({
      where: { id_compte: req.id_compte },
    });
    if (!personne) {
      return res.status(404).send({ message: "NOK" });
    }

    const trajetsConducteur = await Trajet.findAll({
      where: { id_personne: personne.id },
    });

    const inscriptions = trajetsConducteur.map((trajet) => {
      return {
        id: trajet.id,
        kms: trajet.kms,
        dateT: trajet.dateT,
        place_proposees: trajet.place_proposees,
        id_personne: trajet.id_personne,
        id_ville_dep: trajet.id_ville_dep,
        id_ville_arr: trajet.id_ville_arr,
      };
    });

    res.status(200).send({ message: "OK", inscriptions });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "NOK" });
  }
};

exports.readPassager = async (req, res) => {
  try {
    const personne = await Personne.findOne({
      where: { id_compte: req.id_compte },
    });
    if (!personne) {
      return res.status(404).send({ message: "NOK" });
    }

    const trajetsPassager = await personne.getTrajets();

    const inscriptions = trajetsPassager.map((trajet) => {
      return {
        id: trajet.id,
        kms: trajet.kms,
        dateT: trajet.dateT,
        place_proposees: trajet.place_proposees,
        id_personne: trajet.id_personne,
        id_ville_dep: trajet.id_ville_dep,
        id_ville_arr: trajet.id_ville_arr,
      };
    });

    res.status(200).send({ message: "OK", inscriptions });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "NOK" });
  }
};

exports.delete = async (req, res) => {
  try {
    if (!req.body.id_trajet) {
      return res.status(400).send({ message: "NOK" });
    }

    const personne = await Personne.findOne({
      where: { id_compte: req.id_compte },
    });
    if (!personne) {
      return res.status(400).send({ message: "NOK" });
    }

    const trajet = await Trajet.findByPk(req.body.id_trajet);
    if (!trajet) {
      return res.status(400).send({ message: "NOK" });
    }
    const inscrit = await personne.hasTrajet(trajet);
    if (!inscrit) {
      return res.status(400).send({ message: "NOK" });
    }

    await personne.removeTrajet(trajet);
    res.status(200).send({ message: "OK" });
  } catch (error) {
    res.status(500).send({ message: "NOK" });
  }
};

const getPlacesDispo = async (trajet) => {
  const placesProposees = trajet.place_proposees;
  const nbInscrits = await trajet.countPersonnes();
  return placesProposees - nbInscrits;
};
