# Covoiturage Frontend

Ce projet a été crée dans le cadre du cours d'architecture logicielle en première année de MBA - Développeur Full Stack - MyDigitalSchool

## Stack

- NodeJS
- Express
- TypeScript
- Sequelize

## Get started

Créez un fichier .env à partir du .env.example

```bash
cp .env.example .env
```

Installation des dépendances

```bash
pnpm i
```

Par défaut l'origin cors acceptée par le front que j'ai crée est sur le port 8000 (Penser à modifier le port si besoin dans le .env ou dans les cors options de votre front)

Un fichier docker compose est à disposition pour l'utilisation de la bdd PostgreSQL et le viewer PgAdmin4
(Dans le cas d'une utilisation d'une autre BDD, modifier la configuration Sequelize lors de son initialisation)

```bash
docker compose up -d || docker-compose up -d
```

## Lancer le projet en local 

```bash
pnpm start || Run and debug -> Run
```

## Test

Des routes de tests sont prévues
- /test/all accessible à tous
- /test/utilisateur accessible aux utilisateurs connectés
- /test/personne accessible aux utilisateurs ayant terminés leur inscription
- /test/admin accessible aux admins
- /test/initData permet de créer un jeu de données de base