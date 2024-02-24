const models = require("../models");
const Voiture = models.voiture;
const Marque = models.marque;
const Personne = models.personne;

exports.insert = async (req, res) => {
    try {
        if(!req.body.modele || !req.body.place || !req.body.id_marque || req.body.place<=1) {
            res.status(400).send({message: "NOK"});
            return;
        }

        const immatriculation = req.body.immatriculation;
        const immatriculationRegex = /^[A-Z]{2}-[0-9]{3}-[A-Z]{2}$/;
        if (!immatriculation || !immatriculationRegex.test(immatriculation)) {
            res.status(400).send({ message: "NOK" });
            return;
        }

        const voiture = await Voiture.findOne({ where : { immatriculation } });
        if (voiture) {
            res.status(404).send({ message: "NOK" });
            return;
        }

        const personne = await Personne.findByPk(req.body.id_personne);
        if (!personne) {
            res.status(404).send({ message: "NOK" });
            return;
        }

        const marque = await Marque.findByPk(req.body.id_marque)
        if (!marque) {
            res.status(404).send({ message: "NOK" });
            return;
        }

        await Voiture.create({
            modele: req.body.modele,
            place: req.body.place,
            immatriculation: req.body.immatriculation,
            id_personne: req.body.id_personne,
            id_marque: req.body.id_marque
        })

        res.status(201).send({ message: "OK" });
    } catch (error) {
        res.status(500).send({ message: "NOK" });
    }
};

exports.readAll = async (req, res) => {
    try{
        const voitures = await Voiture.findAll();
        if(voitures.length === 0) {
            res.status(404).send({ message: "NOK" });
            return;
        }

        const data = voitures.map(voiture => {
            return {
                id: voiture.id,
                modele: voiture.modele,
                place: voiture.place,
                immatriculation: voiture.immatriculation,
                id_personne: voiture.id_personne,
                id_marque: voiture.id_marque,
            }
        })

        res.send({ message: "OK", voitures: data });
    } catch (error) {
        res.status(500).send({ message: "NOK" });
    }
};