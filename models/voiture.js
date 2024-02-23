const DataTypes = require('sequelize').DataTypes;

module.exports = (sequelize) => {
    const Voiture = sequelize.define('voiture', {
        modele: DataTypes.STRING,
        place: DataTypes.INTEGER,
        immatriculation: DataTypes.STRING
    }, {
        indexes: [
            {
                unique: true,
                name: 'unique_id_compte',
                fields: ['id_personne']
            }
        ]
    });

    Voiture.associate = models => {
        Voiture.belongsTo(models.personne, { foreignKey: 'id_personne' });
        Voiture.belongsTo(models.marque, { foreignKey: 'id_marque' });
    };

    return Voiture;
};
