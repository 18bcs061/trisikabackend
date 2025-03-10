const express = require("express");
const router = express.Router();
const fcmController = require('../controllers/fcmController');
const authMiddleware = require("../Middleware/authMiddleware");

/**
 * @swagger
 * /token/user/update-fcm-token:
 *   post:
 *     summary: Update FCM Token for User
 *     tags: [FCM Token]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fcmToken:
 *                 type: string
 *                 example: "fcm_token_example"
 *     responses:
 *       200:
 *         description: FCM Token updated successfully for user
 *       400:
 *         description: Missing FCM Token
 *       500:
 *         description: Internal Server Error
 */
router.post("/user/update-fcm-token", authMiddleware, fcmController.updateUserFCMToken);

/**
 * @swagger
 * /token/driver/update-fcm-token:
 *   post:
 *     summary: Update FCM Token for Driver
 *     tags: [FCM Token]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fcmToken:
 *                 type: string
 *                 example: "fcm_token_example"
 *     responses:
 *       200:
 *         description: FCM Token updated successfully for driver
 *       400:
 *         description: Missing FCM Token
 *       500:
 *         description: Internal Server Error
 */
router.post("/driver/update-fcm-token", authMiddleware, fcmController.updateDriverFCMToken);

module.exports = router;
