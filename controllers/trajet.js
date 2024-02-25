const models = require("../models");
const Personne = models.personne;
const Ville = models.ville;
const Trajet = models.trajet;

exports.insert = async (req, res) => {
    try {
        if(!req.body.id_personne || !req.body.kms || !req.body.dateT || !req.body.place_proposees || !req.body.id_ville_dep || !req.body.id_ville_arr || (req.body.id_ville_dep === req.body.id_ville_arr)) {
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