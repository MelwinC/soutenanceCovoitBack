const models = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Compte = models.compte;
const Role = models.role;
const Op = models.Sequelize.Op;
require('dotenv').config();

exports.register = async (req, res) => {
    try{
        if(!req.body.login || !req.body.password){
            return res.status(400).send({ message: "NOK" });
        }

        const role = await Role.findOne( { where: { nom: "utilisateur" }});

        const compte = await Compte.create({
            login: req.body.login,
            password: bcrypt.hashSync(req.body.password)
        });
        compte.setRoles(role);

        res.status(201).send({ message: "OK" });
    } catch (error) {
        res.status(500).send({ message: "NOK" });
    }
};

exports.registerAdmin = async (req, res) => {
    try{
        if(!req.body.login || !req.body.password){
            return res.status(400).send({ message: "NOK" });
        }

        const roles = ["utilisateur", "personne", "admin"];
        const rolesDb = await Role.findAll( { where: { nom: { [Op.or]: roles } }});

        const compte = await Compte.create({
            login: req.body.login,
            password: bcrypt.hashSync(req.body.password)
        });
        compte.setRoles(rolesDb);

        res.status(201).send({ message: "OK" });
    } catch (error) {
        res.status(500).send({ message: "NOK" });
    }
};

exports.login = async (req, res) => {
    try {
        if(!req.body.login || !req.body.password) {
            console.log("login or password not found")
            return res.status(400).send({message: "NOK"});
        }

        const compte = await Compte.findOne({where: { login: req.body.login }});
        if (!compte) {
            console.log("compte not found")
            return res.status(404).send({message: "NOK"});
        }

        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            compte.password
        );

        if (!passwordIsValid) {
            console.log("password not valid")
            return res.status(401).send({
                accessToken: null,
                message: "NOK"
            });
        }

        const token = jwt.sign({ id: compte.id }, process.env.JWT_SECRET, {
            expiresIn: 86400 // 24 hours
        });

        const authorities = [];
        const roles = await compte.getRoles();
        roles.map(role => {
            authorities.push(role.nom);
        });
        res.status(200).send({
            id: compte.id,
            login: compte.login,
            roles: authorities,
            accessToken: token
        });

    } catch (error) {
        res.status(500).send({ message: "NOK" });
    }
};