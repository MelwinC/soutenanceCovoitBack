const express = require('express');
const router = express.Router();
const { authJwt } = require("../middlewares");
const trajetController = require("../controllers/trajet");

/**
 * @openapi
 * tags:
 *   name: Trajet
 *   description: Gestion des trajets
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Insert_Trajet:
 *       type: object
 *       properties:
 *         kms:
 *           type: string
 *         dateT:
 *           type: string
 *           format: date-time
 *         place_proposees:
 *           type: integer
 *         id_personne:
 *           type: integer
 *         id_ville_dep:
 *           type: integer
 *         id_ville_arr:
 *           type: integer
 *     Delete_Trajet:
 *       type: object
 *       properties:
 *         id_trajet:
 *           type: integer
 */

/**
 * @swagger
 * /listeTrajet:
 *   get:
 *     summary: Liste de tous les trajets.
 *     description: Récupère la liste de tous les trajets.
 *     tags: [Trajet]
 *     responses:
 *       '200':
 *         description: Succès de la requête. Retourne la liste des trajets.
 *       '401':
 *         description: Non autorisé. L'utilisateur doit être connecté et être une personne.
 */
router.get("/listeTrajet",
    [authJwt.verifyToken, authJwt.isPersonne],
    trajetController.readAll);

/**
 * @swagger
 * /rechercheTrajet:
 *   get:
 *     summary: Recherche un trajet.
 *     description: Recherche un trajet en fonction des critères de l'utilisateur.
 *     tags: [Trajet]
 *     responses:
 *       '200':
 *         description: Succès de la requête. Retourne les trajets correspondants.
 *       '401':
 *         description: Non autorisé. L'utilisateur doit être connecté et être une personne.
 */
router.get("/rechercheTrajet",
    [authJwt.verifyToken, authJwt.isPersonne],
    trajetController.search);

/**
 * @swagger
 * /insertTrajet:
 *   post:
 *     summary: Insérer un trajet.
 *     description: Insère un nouveau trajet.
 *     tags: [Trajet]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Insert_Trajet'
 *     responses:
 *       '201':
 *         description: Inscription réussie.
 *       '401':
 *         description: Non autorisé. L'utilisateur doit être connecté et être une personne.
 */
router.post("/insertTrajet",
    [authJwt.verifyToken, authJwt.isPersonne],
    trajetController.insert);

/**
 * @swagger
 * /deleteTrajet:
 *   delete:
 *     summary: Supprimer un trajet.
 *     description: Supprime un trajet existant.
 *     tags: [Trajet]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Delete_Trajet'
 *     responses:
 *       '200':
 *         description: Suppression réussie.
 *       '401':
 *         description: Non autorisé. L'utilisateur doit être connecté et être une personne.
 */
router.delete("/deleteTrajet",
    [authJwt.verifyToken, authJwt.isPersonne],
    trajetController.delete);

module.exports = router;