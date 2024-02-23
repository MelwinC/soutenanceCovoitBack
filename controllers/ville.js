const models = require("../models");
const Ville = models.ville;

exports.insert = (req, res) => {
    if(!req.body.ville || !req.body.cp){
        res.status(400).send({ message: "NOK" });
    } else {
        Ville.findAll({
            where: {
                ville: req.body.ville
            }
        })
            .then(ville => {
                if (ville.length > 0) {
                    res.status(400).send({ message: "NOK" });
                } else {
                    Ville.create({
                        ville: req.body.ville,
                        cp: req.body.cp
                    })
                        .then(() => {
                            res.send({ message: "OK" });
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

exports.readAll = (req, res) => {
    Ville.findAll()
        .then(villes => {
            if(villes.length === 0){
                res.status(404).send({ message: "NOK" });
            } else {
                const data = villes.map(ville => {
                    return {
                        id: ville.id,
                        ville: ville.ville,
                        cp: ville.cp
                    }
                })
                res.send({ message: "OK", villes: data });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};