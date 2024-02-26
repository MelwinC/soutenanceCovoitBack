const express = require('express');
const router = express.Router();
const { verifyRegister, authJwt } = require("../middlewares");
const controller = require("../controllers/compte");

/**
 * @openapi
 * tags:
 *   name: Compte
 *   description: Gestion des comptes utilisateurs
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Compte:
 *       type: object
 *       properties:
 *         login:
 *           type: string
 *         password:
 *           type: string
 *           format: password
 */

/**
 * @openapi
 * /register:
 *   post:
 *     summary: Enregistrement d'un nouvel utilisateur
 *     tags: [Compte]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Compte'
 *     responses:
 *       '200':
 *         description: Utilisateur enregistré avec succès
 *       '400':
 *         description: Requête invalide
 *       '500':
 *         description: Erreur interne du serveur
 */
router.post("/register",
    [verifyRegister.checkDuplicateLogin],
    controller.register);

/**
 * @openapi
 * /register/admin:
 *   post:
 *     summary: Enregistrement d'un nouvel utilisateur administrateur
 *     tags: [Compte]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Compte'
 *     responses:
 *       '200':
 *         description: Administrateur enregistré avec succès
 *       '400':
 *         description: Requête invalide
 *       '403':
 *         description: Accès non autorisé
 *       '500':
 *         description: Erreur interne du serveur
 */
router.post("/register/admin",
    [authJwt.verifyToken, authJwt.isAdmin, verifyRegister.checkDuplicateLogin],
    controller.registerAdmin
);

/**
 * @openapi
 * /login:
 *   post:
 *     summary: Connexion d'un utilisateur
 *     tags: [Compte]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Compte'
 *     responses:
 *       '200':
 *         description: Connexion réussie
 *       '400':
 *         description: Requête invalide
 *       '401':
 *         description: Identifiants incorrects
 *       '500':
 *         description: Erreur interne du serveur
 */
router.post("/login", controller.login);

module.exports = router;