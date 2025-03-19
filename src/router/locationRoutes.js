const express = require('express');
const router = express.Router();
const authMiddleware = require("../Middleware/authMiddleware");
const locationController = require('../controllers/locationController')


/**
 * @swagger
 * /locations/driver/update-location:
 *   post:
 *     summary: Update Driver's Current Location
 *     tags: [Location]
 *     description: Update the current location of the authenticated driver
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentLatitude:
 *                 type: number
 *                 example: 28.7041
 *               currentLongitude:
 *                 type: number
 *                 example: 77.1025
 *     responses:
 *       200:
 *         description: Driver location updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Driver location updated successfully"
 *                 driver:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "65b7a3f91872a6f2a8e7b9c1"
 *                     currentLatitude:
 *                       type: number
 *                       example: 28.7041
 *                     currentLongitude:
 *                       type: number
 *                       example: 77.1025
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Missing required fields
 *       403:
 *         description: Unauthorized access
 *       404:
 *         description: Driver not found
 *       500:
 *         description: Internal Server Error
 */
router.post("/driver/update-location", authMiddleware, locationController.updateDriverLocation);

/**
 * @swagger
 * /locations/user/update-location:
 *   post:
 *     summary: Update User's Current Location
 *     tags: [Location]
 *     description: Update the current location of the authenticated user
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentLatitude:
 *                 type: number
 *                 example: 28.7041
 *               currentLongitude:
 *                 type: number
 *                 example: 77.1025
 *     responses:
 *       200:
 *         description: User location updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "User location updated successfully"
 *                 User:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "65b7a3f91872a6f2a8e7b9c1"
 *                     currentLatitude:
 *                       type: number
 *                       example: 28.7041
 *                     currentLongitude:
 *                       type: number
 *                       example: 77.1025
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Missing required fields
 *       403:
 *         description: Unauthorized access
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.post("/user/update-location", authMiddleware, locationController.updateUserLocation);

module.exports = router;