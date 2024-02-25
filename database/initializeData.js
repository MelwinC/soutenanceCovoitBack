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
        const ville1 = await models.ville.create({
            ville: "Vannes",
            cp: "56000"
        });

        // Créer une ville
        const ville2 = await models.ville.create({
            ville: "Lorient",
            cp: "56100"
        });

        // Créer un compte admin
        const compteAdmin = await models.compte.create({
            login: "admin",
            password: bcrypt.hashSync("test")
        });

        // Créer un compte sans personne associee
        const compteUtilisateur = await models.compte.create({
            login: "user",
            password: bcrypt.hashSync("test")
        });

        // Créer un compte
        const comptePers1 = await models.compte.create({
            login: "bob",
            password: bcrypt.hashSync("test")
        });

        // Créer un compte
        const comptePers2 = await models.compte.create({
            login: "patrick",
            password: bcrypt.hashSync("test")
        });

        // Créer une personne admin
        await models.personne.create({
            prenom: "Admin",
            nom: "Admin",
            email: "admin@admin.com",
            tel: "0123456789",
            id_compte: compteAdmin.id,
            id_ville: ville1.id
        });

        // Créer une personne
        const personne = await models.personne.create({
            prenom: "Bob",
            nom: "Eponge",
            email: "eponge.bob@example.com",
            tel: "0123456789",
            id_compte: comptePers1.id,
            id_ville: ville1.id
        });

        // Créer une seconde personne
        const personne2 = await models.personne.create({
            prenom: "Patrick",
            nom: "Etoile",
            email: "etoile.patrick@example.com",
            tel: "0123456789",
            id_compte: comptePers2.id,
            id_ville: ville2.id
        });

        // Ajout des roles à l'admin
        const rolesAdmin = await models.role.findAll({ where: { nom: ['utilisateur', 'personne', 'admin'] } });
        compteAdmin.addRoles(rolesAdmin);

        // Ajout des roles au compte utilisateur
        const roleUtilisateur = await models.role.findAll({ where: { nom: 'utilisateur' } });
        compteUtilisateur.addRoles(roleUtilisateur);

        // Ajout des roles à la personne
        const roles = await models.role.findAll({ where: { nom: ['utilisateur', 'personne'] } });
        comptePers1.addRoles(roles);
        comptePers2.addRoles(roles);

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

        await models.trajet.bulkCreate([
            {
                kms: 65,
                dateT: "2024-02-28T08:30:00Z",
                place_proposees: 3,
                id_ville_dep: ville1.id,
                id_ville_arr: ville2.id,
                id_personne: personne.id
            },
            {
                kms: 65,
                dateT: "2024-02-27T14:00:00Z",
                place_proposees: 4,
                id_ville_dep: ville2.id,
                id_ville_arr: ville1.id,
                id_personne: personne2.id
            }
        ]);

        await personne.addTrajets([2]);
        await personne2.addTrajets([1]);

    } catch (error) {
        console.error("Erreur lors de l'initialisation des data: ", error);
    }
}

module.exports = initial;
