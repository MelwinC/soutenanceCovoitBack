const models = require("../models");
const Voiture = models.voiture;

exports.readAll = (req, res) => {
    Voiture.findAll()
        .then(voitures => {
            if(voitures.length === 0){
                res.status(404).send({ message: "NOK" });
            } else {
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
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};