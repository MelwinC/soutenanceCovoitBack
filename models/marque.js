const DataTypes = require('sequelize').DataTypes;

module.exports = (sequelize) => {
    const Marque = sequelize.define('marque', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nom: DataTypes.STRING
    });

    Marque.associate = models => {
        Marque.hasMany(models.voiture, { foreignKey: 'id_marque' });
    };

    return Marque;
};
