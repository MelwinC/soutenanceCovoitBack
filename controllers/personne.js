const models = require("../models");
const Personne = models.personne;
const Compte = models.compte;
const Ville = models.ville;
const Role = models.role;

exports.insert = async (req, res) => {
    try {
        if(!req.body.prenom || !req.body.nom || !req.body.tel || !req.body.id_compte || !req.body.id_ville) {
            console.log("1");
            return res.status(400).send({message: "NOK"});
        }

        const compte = await Compte.findByPk(req.body.id_compte);
        if(!compte){
            console.log("2");
            return res.status(404).send({message: "NOK"});
        }

        const ville = await Ville.findByPk(req.body.id_ville);
        if(!ville){
            console.log("3");
            return res.status(404).send({message: "NOK"});
        }

        const email = req.body.email;
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!email || !emailRegex.test(email)) {
            console.log("4");
            return res.status(400).send({ message: "NOK" });
        }

        await Personne.create({
            prenom: req.body.prenom,
            nom: req.body.nom,
            tel: req.body.tel,
            email: email,
            id_compte: req.body.id_compte,
            id_ville: req.body.id_ville
        })
        const role = await Role.findOne({ where: { nom: "personne" } });
        compte.addRoles(role);

        res.status(201).send({ message: "OK" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
};

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