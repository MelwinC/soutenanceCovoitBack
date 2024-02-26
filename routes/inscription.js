const express = require('express');
const router = express.Router();
const { authJwt} = require("../middlewares");
const inscriptionController = require("../controllers/inscription");

/**
 * @openapi
 * tags:
 *   name: Inscription
 *   description: Gestion des inscriptions aux trajets
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Insert_Inscription:
 *       type: object
 *       properties:
 *         id_personne:
 *           type: integer
 *         id_trajet:
 *           type: integer
 *     Delete_Inscription:
 *       type: object
 *       properties:
 *         id_trajet:
 *           type: integer
 */


/**
 * @swagger
 * /listeInscription:
 *   get:
 *     summary: Liste de toutes les inscriptions.
 *     description: Récupère la liste de toutes les inscriptions.
 *     tags: [Inscription]
 *     responses:
 *       '200':
 *         description: Succès de la requête. Retourne la liste des inscriptions.
 *       '401':
 *         description: Non autorisé. L'utilisateur doit être connecté et être une personne.
 */
router.get("/listeInscription",
    [authJwt.verifyToken, authJwt.isPersonne],
    inscriptionController.readAll);

/**
 * @swagger
 * /listeInscriptionConducteur:
 *   get:
 *     summary: Liste des inscriptions en tant que conducteur.
 *     description: Récupère la liste des inscriptions en tant que conducteur.
 *     tags: [Inscription]
 *     responses:
 *       '200':
 *         description: Succès de la requête. Retourne la liste des inscriptions en tant que conducteur.
 *       '401':
 *         description: Non autorisé. L'utilisateur doit être connecté et être une personne.
 */
router.get("/listeInscriptionConducteur",
    [authJwt.verifyToken, authJwt.isPersonne],
    inscriptionController.readConducteur);

/**
 * @swagger
 * /listeInscriptionUser:
 *   get:
 *     summary: Liste des inscriptions en tant que passager.
 *     description: Récupère la liste des inscriptions en tant que passager.
 *     tags: [Inscription]
 *     responses:
 *       '200':
 *         description: Succès de la requête. Retourne la liste des inscriptions en tant que passager.
 *       '401':
 *         description: Non autorisé. L'utilisateur doit être connecté et être une personne.
 */
router.get("/listeInscriptionUser",
    [authJwt.verifyToken, authJwt.isPersonne],
    inscriptionController.readPassager);

/**
 * @swagger
 * /insertInscription:
 *   post:
 *     summary: Insérer une inscription.
 *     description: Insère une nouvelle inscription.
 *     tags: [Inscription]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Insert_Inscription'
 *     responses:
 *       '201':
 *         description: Inscription réussie.
 *       '401':
 *         description: Non autorisé. L'utilisateur doit être connecté et être une personne.
 */
router.post("/insertInscription",
    [authJwt.verifyToken, authJwt.isPersonne],
    inscriptionController.insert);

/**
 * @swagger
 * /deleteInscription:
 *   delete:
 *     summary: Supprimer une inscription.
 *     description: Supprime une inscription existante.
 *     tags: [Inscription]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Delete_Inscription'
 *     responses:
 *       '200':
 *         description: Suppression réussie.
 *       '401':
 *         description: Non autorisé. L'utilisateur doit être connecté et être une personne.
 */
router.delete("/deleteInscription",
    [authJwt.verifyToken, authJwt.isPersonne],
    inscriptionController.delete);

module.exports = router;