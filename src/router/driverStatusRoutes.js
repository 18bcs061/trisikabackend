const express = require('express');
const router = express.Router();
const driverStatusController = require('../controllers/driverStatusController');
const authMiddleware = require("../Middleware/authMiddleware");

/**
 * @swagger
 * /driver/status:
 *   put:
 *     summary: Update driver's accepting rides status
 *     tags: [Driver Status]
 *     description: Driver updates their availability status for accepting rides
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               acceptingRides:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Driver status updated successfully
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
 *                   example: "Status updated successfully"
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.put('/status', authMiddleware, driverStatusController.updateDriverStatus);

module.exports = router;
