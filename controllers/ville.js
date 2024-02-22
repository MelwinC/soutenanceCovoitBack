const models = require("../models");
const Ville = models.ville;

exports.insert = (req, res) => {
    if(!req.body.ville || !req.body.cp){
        res.status(400).send({ message: "Erreur ! Veuillez remplir tous les champs !" });
    } else {
        Ville.findAll({
            where: {
                ville: req.body.ville
            }
        })
            .then(ville => {
                if (ville.length > 0) {
                    res.status(400).send({ message: "Erreur ! La ville existe déjà !" });
                } else {
                    Ville.create({
                        ville: req.body.ville,
                        cp: req.body.cp
                    })
                        .then(() => {
                            res.send({ message: "La ville est enregistrée !" });
                        })
                        .catch(err => {
                            res.status(500).send({ message: err.message });
                        });
                }
            })
            .catch(err => {
                res.status(500).send({ message: err.message });
            });
    }
};
