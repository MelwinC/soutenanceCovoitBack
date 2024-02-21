module.exports = (sequelize, DataTypes) => {
    const Personne = sequelize.define('personne', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        prenom: DataTypes.STRING,
        nom: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        tel: DataTypes.STRING
    });

    Personne.associate = models => {
        Personne.belongsTo(models.compte, { foreignKey: 'id_compte' });
        Personne.belongsTo(models.ville, { foreignKey: 'id_ville' });
        Personne.hasMany(models.voiture, { foreignKey: 'id_personne' });
        Personne.belongsToMany(models.trajet, { through: 'reserver', foreignKey: 'id_personne' });
    };

    return Personne;
};
