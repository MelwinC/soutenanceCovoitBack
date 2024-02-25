const DataTypes = require('sequelize').DataTypes;

module.exports = (sequelize) => {
    const Voiture = sequelize.define('voiture', {
        modele: DataTypes.STRING,
        place: DataTypes.INTEGER,
        immatriculation: DataTypes.STRING,
        id_marque: {
            type: DataTypes.INTEGER,
            allowNull: false,
            onDelete: 'RESTRICT'
        }
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
