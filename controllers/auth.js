const models = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Compte = models.compte;
const Role = models.role;
const Op = models.Sequelize.Op;
require('dotenv').config();

exports.register = (req, res) => {
    if(!req.body.login || !req.body.password){
        res.status(400).send({ message: "NOK" });
    } else {
        //! créer un compte
        Compte.create({
            login: req.body.login,
            password: bcrypt.hashSync(req.body.password)
        })
            .then(compte => {
                if (req.body.roles) {
                    Role.findAll({
                        where: {
                            nom: {
                                [Op.or]: req.body.roles
                            }
                        }
                    })
                        .then(roles => {
                            compte.setRoles(roles).then(() => {
                                res.send({ message: "OK" });
                            });
                        });
                } else {
                    //! compte role = 1
                    compte.setRoles([1]).then(() => {
                        res.send({ message: "OK" });
                    });
                }
            })
            .catch(err => {
                res.status(500).send({ message: err.message });
                console.log("message:"  + err.message);
            });
    }
};

exports.login = (req, res) => {
    if(!req.body.login || !req.body.password){
        res.status(400).send({ message: "NOK" });
    } else {
        Compte.findOne({
            where: {
                login: req.body.login
            }
        })
            .then(compte => {
                if (!compte) {
                    return res.status(404).send({ message: "NOK" });
                }

                const passwordIsValid = bcrypt.compareSync(
                    req.body.password,
                    compte.password
                );

                if (!passwordIsValid) {
                    return res.status(401).send({
                        accessToken: null,
                        message: "NOK"
                    });
                }

                const token = jwt.sign({ id: compte.id }, process.env.JWT_SECRET, {
                    expiresIn: 86400 // 24 hours
                });

                const authorities = [];
                compte.getRoles().then(roles => {
                    for (let i = 0; i < roles.length; i++) {
                        authorities.push(roles[i].nom);
                    }
                    res.status(200).send({
                        id: compte.id,
                        login: compte.login,
                        roles: authorities,
                        accessToken: token
                    });
                });
            })
            .catch(err => {
                res.status(500).send({ message: err.message });
            });
    }
};