const express = require('express');
const userController = require('../controllers/userController');
const { authenticate, isAdmin, canViewProfile } = require('../middleware/auth');
const upload = require('../middleware/upload');

const userRouter = express.Router();

/**
 * @swagger
 * /user/me:
 *   get:
 *     summary: Get current user profile
 *     tags: [User]
 *     responses:
 *       200:
 *         description: User profile fetched successfully
 *       401:
 *         description: Unauthorized
 */
userRouter.get('/me', authenticate, userController.getProfile);

/**
 * @swagger
 * /user/me:
 *   put:
 *     summary: Update current user profile
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               bio:
 *                 type: string
 *               phone:
 *                 type: string
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *       400:
 *         description: Invalid input
 */
userRouter.put('/me', authenticate, upload.single('photo'), userController.updateProfile);

/**
 * @swagger
 * /user/profiles:
 *   get:
 *     summary: List all public profiles
 *     tags: [User]
 *     responses:
 *       200:
 *         description: List of public profiles
 */
userRouter.get('/profiles', authenticate, userController.listPublicProfiles);

/**
 * @swagger
 * /user/profiles/all:
 *   get:
 *     summary: List all profiles (admin only)
 *     tags: [User]
 *     responses:
 *       200:
 *         description: List of all profiles
 *       403:
 *         description: Forbidden
 */
userRouter.get('/profiles/all', authenticate, isAdmin, userController.listAllProfiles);

module.exports = userRouter;
