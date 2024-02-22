const Sequelize = require('sequelize');
const sequelize = require('../database/connexion');

const models = {
    sequelize: sequelize,
    Sequelize: Sequelize,
    compte: require("../models/compte")(sequelize),
    marque: require("../models/marque")(sequelize),
    personne: require("../models/personne")(sequelize),
    role: require("../models/role")(sequelize),
    trajet: require("../models/trajet")(sequelize),
    ville: require("../models/ville")(sequelize),
    voiture: require("../models/voiture")(sequelize),
}
Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

module.exports = models;
