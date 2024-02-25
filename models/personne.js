const DataTypes = require('sequelize').DataTypes;

module.exports = (sequelize) => {
    const Personne = sequelize.define('personne', {
        prenom: DataTypes.STRING,
        nom: DataTypes.STRING,
        email: DataTypes.STRING,
        tel: DataTypes.STRING,
        id_ville: {
            type: DataTypes.INTEGER,
            allowNull: false,
            onDelete: 'RESTRICT'
        }
    },
        {
            indexes: [
                {
                    unique: true,
                    name: 'unique_email',
                    fields: ['email']
                },
                {
                    unique: true,
                    name: 'uniqueid_compte',
                    fields: ['id_compte']
                }
            ]
        }
    );

    Personne.associate = models => {
        Personne.belongsTo(models.compte, { foreignKey: 'id_compte', onDelete: 'CASCADE'});
        Personne.belongsTo(models.ville, { foreignKey: 'id_ville' });
        Personne.hasMany(models.voiture, { foreignKey: 'id_personne', onDelete: 'CASCADE' });
        Personne.belongsToMany(models.trajet, { through: 'inscrire', foreignKey: 'id_personne', onDelete: 'CASCADE' });
    };

    return Personne;
};
