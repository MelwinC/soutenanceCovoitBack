const DataTypes = require('sequelize').DataTypes;

module.exports = (sequelize) => {
    const Trajet = sequelize.define('trajet', {
        kms: DataTypes.STRING,
        dateT: DataTypes.DATE,
        place_proposees: DataTypes.STRING
    });

    Trajet.associate = models => {
        Trajet.belongsTo(models.personne, { foreignKey: 'id_personne' });
        Trajet.belongsTo(models.ville, { foreignKey: 'id_ville_dep' });
        Trajet.belongsTo(models.ville, { foreignKey: 'id_ville_arr' });
        Trajet.belongsToMany(models.personne, { through: 'reserver', foreignKey: 'id_trajet' });
    };

    return Trajet;
};
