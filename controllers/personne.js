const models = require("../models");
const Personne = models.personne;

exports.select = async (req, res) => {
    try {
        if(!req.body.id){
            res.status(400).send({ message: "NOK" });
        }

        const personne = await Personne.findByPk(req.body.id);
        if(!personne){
            return res.status(404).send({ message: "NOK" });
        }

        res.status(200).send({
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
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.readAll = async (req, res) => {
    try {
        const personnes = await Personne.findAll();
        if(personnes.length === 0) {
            return res.status(404).send({message: "NOK"});
        }
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
        res.status(200).send({ message: "OK", personnes: data });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};