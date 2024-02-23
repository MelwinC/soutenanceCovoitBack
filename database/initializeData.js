const models = require("../models");
const bcrypt = require("bcryptjs");

async function initial() {
    try {
        // Créer les rôles
        await models.role.bulkCreate([
            { nom: "utilisateur" },
            { nom: "personne" },
            { nom: "admin" }
        ]);

        // Créer une ville
        const ville = await models.ville.create({
            ville: "Vannes",
            cp: "56000"
        });

        // Créer un compte admin
        const compteAdmin = await models.compte.create({
            login: "admin",
            password: bcrypt.hashSync("admin")
        });

        // Créer un compte
        const compte = await models.compte.create({
            login: "john",
            password: bcrypt.hashSync("doe")
        });

        // Créer une personne admin
        await models.personne.create({
            prenom: "Admin",
            nom: "Admin",
            email: "admin@admin.com",
            tel: "0123456789",
            id_compte: compteAdmin.id,
            id_ville: ville.id
        });

        // Créer une personne
        const personne = await models.personne.create({
            prenom: "Bob",
            nom: "Eponge",
            email: "eponge.bob@example.com",
            tel: "0123456789",
            id_compte: compte.id,
            id_ville: ville.id
        });

        // Créer une seconde personne
        const personne2 = await models.personne.create({
            prenom: "Patrick",
            nom: "Etoile",
            email: "etoile.patrick@example.com",
            tel: "0123456789",
            id_compte: compte.id,
            id_ville: ville.id
        });

        // Ajout des roles à l'admin
        const rolesAdmin = await models.role.findAll({ where: { nom: ['utilisateur', 'personne', 'admin'] } });
        compteAdmin.addRoles(rolesAdmin);

        // Ajout des roles à la personne
        const roles = await models.role.findAll({ where: { nom: ['utilisateur', 'personne'] } });
        compte.addRoles(roles);
        //

        // Créer des marques
        const marquePeugeot = await models.marque.create({ nom: "Peugeot" });
        const marqueRenault = await models.marque.create({ nom: "Renault" });

        // Créer des voitures associées à la personne et aux marques
        await models.voiture.bulkCreate([
            {
                modele: "306",
                place: 5,
                immatriculation: "AB-123-CD",
                id_marque: marquePeugeot.id,
                id_personne: personne.id
            },
            {
                modele: "Twingo",
                place: 5,
                immatriculation: "EF-456-GH",
                id_marque: marqueRenault.id,
                id_personne: personne2.id
            }
        ]);


    } catch (error) {
        console.error("Erreur lors de l'initialisation des data: ", error);
    }
}

module.exports = initial;
