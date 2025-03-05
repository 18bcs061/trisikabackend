const express = require('express');
const router = express.Router();
const rideController = require('../controllers/rideController');
const authMiddleware = require("../middleware/authMiddleware");

/**
 * @swagger
 * /rideApi/book:
 *   post:
 *     summary: Book a new ride
 *     tags: [Book Ride]
 *     description: User books a ride by providing pickup, destination, and vehicle type
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pickupLat:
 *                 type: number
 *                 example: 28.7041
 *               pickupLong:
 *                 type: number
 *                 example: 77.1025
 *               dropLat:
 *                 type: number
 *                 example: 28.4595
 *               dropLong:
 *                 type: number
 *                 example: 77.0266
 *               vehicleType:
 *                 type: string
 *                 example: "Bike"
 *               distance:
 *                 type: number
 *                 example: 0
 *               rideTime:
 *                 type: number
 *                 example: 0
 *               fare:
 *                 type: number
 *                 example: 0
 *     responses:
 *       200:
 *         description: Ride booked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 ride:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     userId:
 *                       type: string
 *                     driverId:
 *                       type: string
 *                     vehicleId:
 *                       type: string
 *                     fare:
 *                       type: number
 *                     rideStatus:
 *                       type: string
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal Server Error
 */
router.post("/book", authMiddleware, rideController.bookRide);

module.exports = router;