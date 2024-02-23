const DataTypes = require('sequelize').DataTypes;

module.exports = (sequelize) => {
    const Marque = sequelize.define('marque', {
        nom: DataTypes.STRING
    });

    Marque.associate = models => {
        Marque.hasMany(models.voiture, { foreignKey: 'id_marque' });
    };

    return Marque;
};
