const express = require('express');
const router = express.Router();
const { authJwt } = require("../middlewares");
const marqueController = require("../controllers/marque");

/**
 * @openapi
 * tags:
 *   name: Marque
 *   description: Gestion des marques de voitures
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Insert_Marque:
 *       type: object
 *       properties:
 *         nom:
 *           type: string
 *     Delete_Marque:
 *       type: object
 *       properties:
 *         id_marque:
 *           type: integer
 */

/**
 * @swagger
 * /listeMarque:
 *   get:
 *     summary: Liste de toutes les marques.
 *     description: Récupère la liste de toutes les marques de voitures.
 *     tags: [Marque]
 *     responses:
 *       '200':
 *         description: Succès de la requête. Retourne la liste des marques.
 *       '401':
 *         description: Non autorisé. L'utilisateur doit être connecté en tant que personne.
 */
router.get("/listeMarque",
    [authJwt.verifyToken, authJwt.isPersonne],
    marqueController.readAll);

/**
 * @swagger
 * /insertMarque:
 *   post:
 *     summary: Insérer une nouvelle marque.
 *     description: Insère une nouvelle marque de voiture.
 *     tags: [Marque]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Insert_Marque'
 *     responses:
 *       '201':
 *         description: Marque ajoutée avec succès.
 *       '401':
 *         description: Non autorisé. L'utilisateur doit être connecté en tant qu'administrateur.
 */
router.post("/insertMarque",
    [authJwt.verifyToken, authJwt.isAdmin],
    marqueController.insert);

/**
 * @swagger
 * /deleteMarque:
 *   delete:
 *     summary: Supprimer une marque.
 *     description: Supprime une marque de voiture existante.
 *     tags: [Marque]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Delete_Marque'
 *     responses:
 *       '200':
 *         description: Suppression réussie.
 *       '401':
 *         description: Non autorisé. L'utilisateur doit être connecté en tant qu'administrateur.
 */
router.delete("/deleteMarque",
    [authJwt.verifyToken, authJwt.isAdmin],
    marqueController.delete);

module.exports = router;
