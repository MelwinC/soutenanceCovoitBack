const DataTypes = require('sequelize').DataTypes;

module.exports = (sequelize) => {
    const Compte = sequelize.define('compte', {
        login: {
            type: DataTypes.STRING,
            unique: true
        },
        password: DataTypes.STRING
    });

    Compte.associate = models => {
        Compte.belongsToMany(models.role, { through: 'posseder', foreignKey: 'id_compte', otherKey: 'id_role'});
        Compte.hasOne(models.personne, { foreignKey: 'id_compte' });
    };

    return Compte;
};
