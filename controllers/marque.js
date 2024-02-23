const models = require("../models");
const Marque = models.marque;

exports.insert = (req, res) => {
    if(!req.body.nom){
        res.status(400).send({ message: "NOK" });
    } else {
        Marque.findAll({
            where: {
                nom: req.body.nom
            }
        })
            .then(marque => {
                if (marque.length > 0) {
                    res.status(400).send({ message: "NOK" });
                } else {
                    Marque.create({
                        nom: req.body.nom,
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
