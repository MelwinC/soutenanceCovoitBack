const express = require('express');
const router = express.Router();
const { authJwt } = require("../middlewares");
const villeController = require("../controllers/ville");

/**
 * @openapi
 * tags:
 *   name: Ville
 *   description: Gestion des villes
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Insert_Ville:
 *       type: object
 *       properties:
 *         ville:
 *           type: string
 *         cp:
 *           type: string
 *     Delete_Ville:
 *       type: object
 *       properties:
 *         id_ville:
 *           type: integer
 */

/**
 * @swagger
 * /listeVille:
 *   get:
 *     summary: Liste de toutes les villes.
 *     description: Récupère la liste de toutes les villes.
 *     tags: [Ville]
 *     responses:
 *       '200':
 *         description: Succès de la requête. Retourne la liste des villes.
 *       '401':
 *         description: Non autorisé. L'utilisateur doit être connecté.
 */
router.get("/listeVille",
    [authJwt.verifyToken],
    villeController.readAll);

/**
 * @swagger
 * /insertVille:
 *   post:
 *     summary: Insérer une ville.
 *     description: Insère une nouvelle ville.
 *     tags: [Ville]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Insert_Ville'
 *     responses:
 *       '201':
 *         description: Inscription réussie.
 *       '401':
 *         description: Non autorisé. L'utilisateur doit être connecté et être administrateur.
 */
router.post("/insertVille",
    [authJwt.verifyToken, authJwt.isAdmin],
    villeController.insert);

/**
 * @swagger
 * /deleteVille:
 *   delete:
 *     summary: Supprimer une ville.
 *     description: Supprime une ville existante.
 *     tags: [Ville]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Delete_Ville'
 *     responses:
 *       '200':
 *         description: Suppression réussie.
 *       '401':
 *         description: Non autorisé. L'utilisateur doit être connecté et être administrateur.
 */
router.delete("/deleteVille",
    [authJwt.verifyToken, authJwt.isAdmin],
    villeController.delete);

module.exports = router;