module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('role', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nom: DataTypes.STRING
    });

    Role.associate = models => {
        Role.belongsToMany(models.compte, { through: 'posseder', foreignKey: 'id_role' });
    };

    return Role;
};
