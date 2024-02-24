const models = require("../models");
const Marque = models.marque;

exports.readAll = async (req, res) => {
    try {
        const marques = await Marque.findAll();
        if(marques.length === 0){
            return res.status(404).send({ message: "NOK" });
        }
        const data = marques.map(marque => {
            return {
                id: marque.id,
                nom: marque.nom,
            }
        });
        res.status(200).send({ message: "OK", marques: data });
    } catch (error) {
        res.status(500).send({ message: "NOK" });
    }
};

exports.insert = async (req, res) => {
    try {
        if(!req.body.nom){
            return res.status(400).send({ message: "NOK" });
        }
        const marque = await Marque.findOne({ where: { nom: req.body.nom }});
        if(marque){
            return res.status(400).send({ message: "NOK" });
        }
        await Marque.create({ nom: req.body.nom});
        res.status(201).send({ message: "OK" });
    } catch (error) {
        res.status(500).send({ message: "NOK" });
    }
};