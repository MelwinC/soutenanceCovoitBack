const models = require("../models");
const Personne = models.personne;
const Trajet = models.trajet;

exports.insert = async (req, res) => {
    try {
        if(!req.body.id_personne || !req.body.id_trajet) {
            return res.status(400).send({message: "NOK"});
        }
        const personne = await Personne.findByPk(req.body.id_personne);
        if(!personne){
            return res.status(400).send({message: "NOK"});
        }
        const trajet = await Trajet.findByPk(req.body.id_trajet);
        if(!trajet){
            return res.status(400).send({message: "NOK"});
        }
        if(trajet.dateT < new Date()){
            return res.status(400).send({message: "NOK"});
        }
        if(trajet.id_personne === req.body.id_personne){
            return res.status(400).send({message: "NOK"});
        }
        const inscriptions = await personne.getTrajets();
        for (const inscription of inscriptions) {
            if (inscription.id === req.body.id_trajet) {
                return res.status(400).send({ message: "NOK" });
            }
        }
        await personne.addTrajets([req.body.id_trajet]);
        res.status(201).send({ message: "OK" });
    } catch (error) {
        res.status(500).send({ message: "NOK" });
    }
};

exports.readAll = async (req, res) => {
    try {
        const personne = await Personne.findOne({ where: { id_compte: req.id_compte } });
        if(!personne) {
            return res.status(404).send({message: "NOK"});
        }

        const trajetsConducteur = await Trajet.findAll({
            where: { id_personne: personne.id }
        });

        const trajetsPassager = await personne.getTrajets();

        const inscriptionsConducteur = trajetsConducteur.map(trajet => {
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

        const inscriptionsPassager = trajetsPassager.map(trajet => {
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

        res.status(200).send({ message: "OK", inscriptionsConducteur, inscriptionsPassager });
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "NOK" });
    }
};

exports.readConducteur = async (req, res) => {
    try {
        const personne = await Personne.findOne({ where: { id_compte: req.id_compte } });
        if(!personne) {
            return res.status(404).send({message: "NOK"});
        }

        const trajetsConducteur = await Trajet.findAll({
            where: { id_personne: personne.id }
        });

        const inscriptions = trajetsConducteur.map(trajet => {
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
        console.log(error)
        res.status(500).send({ message: "NOK" });
    }
};

exports.readPassager = async (req, res) => {
    try {
        const personne = await Personne.findOne({ where: { id_compte: req.id_compte } });
        if(!personne) {
            return res.status(404).send({message: "NOK"});
        }

        const trajetsPassager = await personne.getTrajets();

        const inscriptions = trajetsPassager.map(trajet => {
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
        console.log(error)
        res.status(500).send({ message: "NOK" });
    }
};


exports.delete = async (req, res) => {
    try {
        if(!req.body.id_trajet){
            return res.status(400).send({ message: "NOK" });
        }

        const personne = await Personne.findOne({ where: { id_compte: req.id_compte } });
        if(!personne) {
            return res.status(400).send({message: "NOK"});
        }

        const trajet = await Trajet.findByPk(req.body.id_trajet);
        if(!trajet){
            return res.status(400).send({message: "NOK"});
        }
        const inscrit = await personne.hasTrajet(trajet);
        if(!inscrit){
            return res.status(400).send({message: "NOK"});
        }

        await personne.removeTrajet(trajet);
        res.status(200).send({ message: "OK" });
    } catch (error) {
        res.status(500).send({ message: "NOK" });
    }
};