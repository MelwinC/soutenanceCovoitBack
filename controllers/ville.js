const models = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Compte = models.compte;
const Role = models.role;
const Op = models.Sequelize.Op;

exports.add = (req, res) => {
    console.log(req.body);
};