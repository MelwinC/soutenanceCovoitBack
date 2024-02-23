const models = require("../models");
const Personne = models.personne;

exports.readAll = (req, res) => {
    Personne.findAll()
        .then(personnes => {
            if(personnes.length === 0){
                res.status(404).send({ message: "NOK" });
            } else {
                const data = personnes.map(personne => {
                    return {
                        id: personne.id,
                        prenom: personne.prenom,
                        nom: personne.nom,
                        email: personne.email,
                        tel: personne.tel,
                        id_compte: personne.id_compte,
                        id_ville: personne.id_ville,
                    }
                })
                res.send({ message: "OK", personnes: data });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};