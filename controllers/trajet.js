const models = require("../models");
const {Op} = require("sequelize");
const Personne = models.personne;
const Ville = models.ville;
const Trajet = models.trajet;

exports.insert = async (req, res) => {
    try {
        if(!req.body.id_personne || !req.body.kms || !req.body.dateT || !req.body.place_proposees || !req.body.id_ville_dep || !req.body.id_ville_arr || (req.body.id_ville_dep === req.body.id_ville_arr)) {
            return res.status(400).send({message: "NOK"});
        }
        const trajet = await Trajet.findOne({ where: { id_ville_dep: req.body.id_ville_dep, id_ville_arr: req.body.id_ville_arr, dateT: req.body.dateT, id_personne: req.body.id_personne } });
        if(trajet){
            return res.status(400).send({message: "NOK"});
        }
        const personne = await Personne.findByPk(req.body.id_personne);
        if(!personne){
            return res.status(400).send({message: "NOK"});
        }
        const voiture = await personne.getVoitures();
        if(voiture.length === 0){
            return res.status(400).send({message: "NOK"});
        }
        if(voiture[0].place <= req.body.place_proposees){
            return res.status(400).send({message: "NOK"});
        }
        const villeDep = await Ville.findByPk(req.body.id_ville_dep);
        if(!villeDep){
            return res.status(400).send({message: "NOK"});
        }
        const villeArr = await Ville.findByPk(req.body.id_ville_arr);
        if(!villeArr){
            return res.status(400).send({message: "NOK"});
        }
        await Trajet.create({
            kms: req.body.kms,
            dateT: req.body.dateT,
            place_proposees: req.body.place_proposees,
            id_personne: req.body.id_personne,
            id_ville_dep: req.body.id_ville_dep,
            id_ville_arr: req.body.id_ville_arr,
        })
        res.status(201).send({ message: "OK" });
    } catch (error) {
        res.status(500).send({ message: "NOK" });
    }
};

exports.readAll = async (req, res) => {
    try {
        const trajets = await Trajet.findAll();
        if(trajets.length === 0) {
            return res.status(404).send({message: "NOK"});
        }

        const data = trajets.map(trajet => {
            return {
                id: trajet.id,
                kms: trajet.kms,
                dateT: trajet.dateT,
                place_proposees: trajet.place_proposees,
                id_personne: trajet.id_personne,
                id_ville_dep: trajet.id_ville_dep,
                id_ville_arr: trajet.id_ville_arr,
            }
        });
        res.status(200).send({ message: "OK", trajets: data });
    } catch (error) {
        res.status(500).send({ message: "NOK" });
    }
};

exports.search = async (req, res) => {
    try {
         if(!req.body.dateT || !req.body.id_ville_dep || !req.body.id_ville_arr || (req.body.id_ville_dep === req.body.id_ville_arr)) {
            return res.status(400).send({message: "NOK"});
        }

        const trajets = await Trajet.findAll(
            {
                where: {
                    dateT: {
                        [Op.gte]: new Date(req.body.dateT), // Date >= req.body.dateT
                        [Op.lt]: new Date(new Date(req.body.dateT).setDate(new Date(req.body.dateT).getDate() + 1)) // Date < lendemain de req.body.dateT
                    },
                    id_ville_dep: req.body.id_ville_dep,
                    id_ville_arr: req.body.id_ville_arr,
                }
            }
        );

        const data = trajets.map(trajet => {
            return {
                id: trajet.id,
                kms: trajet.kms,
                dateT: trajet.dateT,
                place_proposees: trajet.place_proposees,
                id_personne: trajet.id_personne,
                id_ville_dep: trajet.id_ville_dep,
                id_ville_arr: trajet.id_ville_arr,
            }
        });
        res.status(200).send({ message: "OK", trajets: data });
    } catch (error) {
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
        if(trajet.id_personne !== personne.id){
            return res.status(400).send({message: "NOK"});
        }
        const inscrits = await trajet.getPersonnes();
        trajet.removePersonnes(inscrits);
        await trajet.destroy();
        res.status(200).send({ message: "OK" });
    } catch (error) {
        res.status(500).send({ message: "NOK" });
    }
};