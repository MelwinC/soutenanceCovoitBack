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