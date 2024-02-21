module.exports = (sequelize, DataTypes) => {
    const Trajet = sequelize.define('trajet', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        kms: DataTypes.STRING,
        dateT: DataTypes.DATE,
        place_proposees: DataTypes.STRING
    });

    Trajet.associate = models => {
        Trajet.belongsTo(models.personne, { foreignKey: 'id_personne' });
        Trajet.belongsTo(models.ville, { foreignKey: 'id_ville_dep', as: 'VilleDepart' });
        Trajet.belongsTo(models.ville, { foreignKey: 'id_ville_arr', as: 'VilleArrivee' });
        Trajet.belongsToMany(models.personne, { through: 'reserver', foreignKey: 'id_trajet' });
    };

    return Trajet;
};
