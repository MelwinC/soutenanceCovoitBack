module.exports = (sequelize, DataTypes) => {
    const Voiture = sequelize.define('voiture', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        modele: DataTypes.STRING,
        place: DataTypes.INTEGER,
        immatriculation: DataTypes.STRING
    });

    Voiture.associate = models => {
        Voiture.belongsTo(models.personne, { foreignKey: 'id_personne' });
        Voiture.belongsTo(models.marque, { foreignKey: 'id_marque' });
    };

    return Voiture;
};
