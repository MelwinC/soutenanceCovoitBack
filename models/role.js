const DataTypes = require('sequelize').DataTypes;

module.exports = (sequelize) => {
    const Role = sequelize.define('role', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nom: DataTypes.STRING
    });

    Role.associate = models => {
        Role.belongsToMany(models.compte, { through: 'posseder', foreignKey: 'id_role', otherKey: 'id_compte' });
    };

    return Role;
};
