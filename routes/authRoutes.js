const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');
const { validateUser } = require('../middleware/validate');

const authRouter = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 */
authRouter.post('/register', validateUser, authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Invalid email or password
 */
authRouter.post('/login', authController.login);

authRouter.get('/logout', authController.logout);

authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
authRouter.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), authController.oauthCallback);

// Add similar routes for Facebook, Twitter, and GitHub authentication
// Example for Facebook:
authRouter.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
authRouter.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), authController.oauthCallback);

// Example for Twitter:
authRouter.get('/twitter', passport.authenticate('twitter'));
authRouter.get('/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }), authController.oauthCallback);

// Example for GitHub:
authRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
authRouter.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), authController.oauthCallback);

module.exports = authRouter;
