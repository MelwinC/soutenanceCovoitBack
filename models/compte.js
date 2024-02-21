module.exports = (sequelize, DataTypes) => {
    const Compte = sequelize.define('compte', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        login: {
            type: DataTypes.STRING,
            unique: true
        },
        password: DataTypes.STRING
    });

    Compte.associate = models => {
        Compte.belongsToMany(models.role, { through: 'posseder', foreignKey: 'id_compte' });
        Compte.hasOne(models.personne, { foreignKey: 'id_compte' });
    };

    return Compte;
};
