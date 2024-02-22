const DataTypes = require('sequelize').DataTypes;

module.exports = (sequelize) => {
    const Voiture = sequelize.define('voiture', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        modele: DataTypes.STRING,
        place: DataTypes.INTEGER,
        immatriculation: DataTypes.STRING
    }, {
        indexes: [{
            unique: true,
            fields: ['id_personne']
        }]
    });

    Voiture.associate = models => {
        Voiture.belongsTo(models.personne, { foreignKey: 'id_personne' });
        Voiture.belongsTo(models.marque, { foreignKey: 'id_marque' });
    };

    return Voiture;
};
