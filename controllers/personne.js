const models = require("../models");
const Personne = models.personne;

exports.select = (req, res) => {
    if(!req.body.id){
        res.status(400).send({ message: "NOK" });
    } else {
        Personne.findByPk(req.body.id)
            .then(personne => {
                if(!personne){
                    res.status(404).send({ message: "NOK" });
                } else {
                    res.send({
                        message: "OK",
                        personne: {
                            id: personne.id,
                            prenom: personne.prenom,
                            nom: personne.nom,
                            email: personne.email,
                            tel: personne.tel,
                            id_compte: personne.id_compte,
                            id_ville: personne.id_ville,
                        }
                    });
                }
            })
            .catch(err => {
                res.status(500).send({ message: err.message });
            });
    }
};

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