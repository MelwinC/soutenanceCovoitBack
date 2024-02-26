const express = require('express');
const router = express.Router();
const { authJwt, verifyRegister } = require("../middlewares");
const personneController = require("../controllers/personne");

/**
 * @openapi
 * tags:
 *   name: Personne
 *   description: Gestion des personnes
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Insert_Personne:
 *       type: object
 *       properties:
 *         prenom:
 *           type: string
 *         nom:
 *           type: string
 *         tel:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         id_compte:
 *           type: integer
 *         id_ville:
 *           type: integer
 *     Update_Personne:
 *       type: object
 *       properties:
 *         prenom:
 *           type: string
 *         nom:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         tel:
 *           type: string
 *         id_marque:
 *           type: integer
 *         modele:
 *           type: string
 *         place:
 *           type: integer
 *     Delete_Personne:
 *       type: object
 *       properties:
 *         id_personne:
 *           type: integer
 */

/**
 * @swagger
 * /insertPersonne:
 *   post:
 *     summary: Insérer une personne.
 *     description: Insère une nouvelle personne.
 *     tags: [Personne]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Insert_Personne'
 *     responses:
 *       '201':
 *         description: Inscription réussie.
 *       '401':
 *         description: Non autorisé. L'utilisateur doit être connecté et être une personne.
 */
router.post("/insertPersonne",
    [authJwt.verifyToken, verifyRegister.checkDuplicateEmail],
    personneController.insert);

/**
 * @swagger
 * /selectPersonne:
 *   get:
 *     summary: Sélectionner une personne.
 *     description: Récupère les informations d'une personne.
 *     tags: [Personne]
 *     responses:
 *       '200':
 *         description: Succès de la requête. Retourne les informations de la personne.
 *       '401':
 *         description: Non autorisé. L'utilisateur doit être connecté et être une personne.
 */
router.get("/selectPersonne",
    [authJwt.verifyToken, authJwt.isPersonne],
    personneController.select);

/**
 * @swagger
 * /listePersonne:
 *   get:
 *     summary: Liste de toutes les personnes.
 *     description: Récupère la liste de toutes les personnes.
 *     tags: [Personne]
 *     responses:
 *       '200':
 *         description: Succès de la requête. Retourne la liste des personnes.
 *       '401':
 *         description: Non autorisé. L'utilisateur doit être connecté et être une personne.
 */
router.get("/listePersonne",
    [authJwt.verifyToken, authJwt.isPersonne],
    personneController.readAll);

/**
 * @swagger
 * /updatePersonne:
 *   put:
 *     summary: Mettre à jour une personne.
 *     description: Met à jour les informations d'une personne existante.
 *     tags: [Personne]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Update_Personne'
 *     responses:
 *       '200':
 *         description: Mise à jour réussie.
 *       '401':
 *         description: Non autorisé. L'utilisateur doit être connecté et être une personne.
 */
router.put("/updatePersonne",
    [authJwt.verifyToken, verifyRegister.checkDuplicateEmail, authJwt.isPersonne],
    personneController.update);

/**
 * @swagger
 * /deletePersonne:
 *   delete:
 *     summary: Supprimer une personne.
 *     description: Supprime une personne existante.
 *     tags: [Personne]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Delete_Personne'
 *     responses:
 *       '200':
 *         description: Suppression réussie.
 *       '401':
 *         description: Non autorisé. L'utilisateur doit être connecté et être une personne.
 */
router.delete("/deletePersonne",
    [authJwt.verifyToken, authJwt.isAdminOrOwner],
    personneController.delete);

module.exports = router;