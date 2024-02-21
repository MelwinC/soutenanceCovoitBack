const Sequelize = require('sequelize');
const sequelize = require('../database/connexion');

const models = {
    sequelize: sequelize,
    Sequelize: Sequelize,
    compte: require("../models/compte")(sequelize, Sequelize.DataTypes),
    marque: require("../models/marque")(sequelize, Sequelize.DataTypes),
    personne: require("../models/personne")(sequelize, Sequelize.DataTypes),
    role: require("../models/role")(sequelize, Sequelize.DataTypes),
    trajet: require("../models/trajet")(sequelize, Sequelize.DataTypes),
    ville: require("../models/ville")(sequelize, Sequelize.DataTypes),
    voiture: require("../models/voiture")(sequelize, Sequelize.DataTypes),
}
Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

module.exports = models;
