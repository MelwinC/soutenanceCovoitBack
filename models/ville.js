const DataTypes = require('sequelize').DataTypes;

module.exports = (sequelize) => {
    const Ville = sequelize.define('ville', {
        ville: DataTypes.STRING,
        cp: DataTypes.STRING
    });

    Ville.associate = models => {
        Ville.hasMany(models.personne, { foreignKey: 'id_ville' });
        Ville.hasMany(models.trajet, { foreignKey: 'id_ville_dep' });
        Ville.hasMany(models.trajet, { foreignKey: 'id_ville_arr' });
    };

    return Ville;
};
