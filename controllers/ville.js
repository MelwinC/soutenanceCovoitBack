const models = require("../models");
const e = require("express");
const Ville = models.ville;

exports.insert = async (req, res) => {
    try {
        if(!req.body.ville || !req.body.cp){
            return res.status(400).send({ message: "NOK" });
        }

        const villeExists = await Ville.findOne({ where: { ville: req.body.ville, cp: req.body.cp }});
        if(villeExists){
            return res.status(404).send({ message: "NOK" });
        }

        await Ville.create({ ville: req.body.ville, cp: req.body.cp });
        res.status(201).send({ message: "OK" });
    } catch (error) {
        res.status(500).send({ message: "NOK" });
    }
};

exports.readAll = async (req, res) => {
    try {
        const villes = await Ville.findAll();
        if(villes.length === 0) {
            return res.status(404).send({message: "NOK"});
        }

        const data = villes.map(ville => {
            return {
                id: ville.id,
                ville: ville.ville,
                cp: ville.cp
            }
        });
        res.status(200).send({ message: "OK", villes: data });
    } catch (error) {
        res.status(500).send({ message: "NOK" });
    }
};

exports.delete = async (req, res) => {
    try {
        if(!req.body.id_ville){
            return res.status(400).send({ message: "NOK" });
        }
        const ville = await Ville.findByPk(req.body.id_ville);
        if(!ville) {
            return res.status(404).send({message: "NOK"});
        }
        await ville.destroy();
        res.status(200).send({ message: "OK" });
    } catch (error) {
        res.status(500).send({ message: "NOK" });
    }
};