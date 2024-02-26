const express = require('express');
const router = express.Router();
const { authJwt } = require("../middlewares");
const voitureController = require("../controllers/voiture");

/**
 * @openapi
 * tags:
 *   name: Voiture
 *   description: Gestion des voitures
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Insert_Voiture:
 *       type: object
 *       properties:
 *         modele:
 *           type: string
 *         place:
 *           type: integer
 *         immatriculation:
 *           type: string
 *         id_personne:
 *           type: integer
 *         id_marque:
 *           type: integer
 *     Delete_Voiture:
 *       type: object
 *       properties:
 *         id_voiture:
 *           type: integer
 */

/**
 * @swagger
 * /listeVoiture:
 *   get:
 *     summary: Liste de toutes les voitures.
 *     description: Récupère la liste de toutes les voitures.
 *     tags: [Voiture]
 *     responses:
 *       '200':
 *         description: Succès de la requête. Retourne la liste des voitures.
 *       '401':
 *         description: Non autorisé. L'utilisateur doit être connecté et être une personne.
 */
router.get("/listeVoiture",
    [authJwt.verifyToken, authJwt.isPersonne],
    voitureController.readAll);

/**
 * @swagger
 * /insertVoiture:
 *   post:
 *     summary: Insérer une voiture.
 *     description: Insère une nouvelle voiture.
 *     tags: [Voiture]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Insert_Voiture'
 *     responses:
 *       '201':
 *         description: Inscription réussie.
 *       '401':
 *         description: Non autorisé. L'utilisateur doit être connecté et être une personne.
 */
router.post("/insertVoiture",
    [authJwt.verifyToken, authJwt.isPersonne],
    voitureController.insert);

/**
 * @swagger
 * /deleteVoiture:
 *   delete:
 *     summary: Supprimer une voiture.
 *     description: Supprime une voiture existante.
 *     tags: [Voiture]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Delete_Voiture'
 *     responses:
 *       '200':
 *         description: Suppression réussie.
 *       '401':
 *         description: Non autorisé. L'utilisateur doit être connecté et être une personne.
 */
router.delete("/deleteVoiture",
    [authJwt.verifyToken, authJwt.isPersonne],
    voitureController.delete);

module.exports = router;