const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * @swagger
 * tags:
 *   - name: UserAuth
 *     description: User registration & login via OTP
 *   - name: DriverAuth
 *     description: Driver registration & login via OTP
 */

/*=======================  USER REGISTRATION =======================*/

/**
 * @swagger
 * /api/auth/user/register/generateOTP:
 *   post:
 *     summary: Request OTP for User Registration
 *     tags: [UserAuth]
 *     description: User provides phoneNumber. Server generates/sends OTP. User is not yet stored in DB.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 example: "1234567890"
 *     responses:
 *       200:
 *         description: OTP sent for User registration
 *       500:
 *         description: Internal server error
 */
router.post('/auth/user/register/generateOTP', authController.requestUserRegistrationOTP);

/**
 * @swagger
 * /api/auth/user/register/verifyOTP:
 *   post:
 *     summary: Verify OTP & return user Id
 *     tags: [UserAuth]
 *     description: User provides phoneNumber + OTP. If valid, it will return the user Id.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 example: "1234567890"
 *               otp:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: User verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                      id:
 *                       type: string
 *       400:
 *         description: Invalid or expired OTP
 *       409:
 *         description: User already exists
 *       500:
 *         description: Internal server error
 */
router.post('/auth/user/register/verifyOTP', authController.verifyUserRegistrationOTP);


/**
 * @swagger
 * /api/auth/user/register/createUser:
 *   post:
 *     summary: Request to create User
 *     tags: [UserAuth]
 *     description: User provides id and other fields. Server create user in db.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: "userId"
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "john@example.com"
 *               role:
 *                 type: string
 *                 example: "user"
 *               active:
 *                 type: boolean
 *                 example: true
 *               fcmToken:
 *                 type: string
 *                 example: "some_fcm_token"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       500:
 *         description: Internal server error
 */
router.post('/auth/user/register/createUser', authController.requestUserRegistration);

/*=======================  USER LOGIN  =======================*/

/**
 * @swagger
 * /api/auth/user/login:
 *   post:
 *     summary: Request OTP for User Login
 *     tags: [UserAuth]
 *     description: User provides phoneNumber. Server sends OTP. 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 example: "1234567890"
 *     responses:
 *       200:
 *         description: OTP sent for User login
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.post('/auth/user/login', authController.requestUserLoginOTP);

/**
 * @swagger
 * /api/auth/user/login/verify:
 *   post:
 *     summary: Verify OTP & Login User
 *     tags: [UserAuth]
 *     description: User provides phoneNumber + OTP. If valid, returns user details + JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 example: "1234567890"
 *               otp:
 *                 type: string
 *                 example: "654321"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     phoneNumber:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                        type: string
 *                     active:
 *                        type: boolean
 *       400:
 *         description: Invalid or expired OTP
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.post('/auth/user/login/verify', authController.verifyUserLoginOTP);

/*=======================  DRIVER REGISTRATION =======================*/

/**
 * @swagger
 * /api/auth/driver/register:
 *   post:
 *     summary: Request OTP for Driver Registration
 *     tags: [DriverAuth]
 *     description: Driver provides phoneNumber + driver details. Server sends OTP. Not yet in DB.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 example: "9876543210"
 *               name:
 *                 type: string
 *                 example: "Jane Driver"
 *               email:
 *                 type: string
 *                 example: "jane.driver@example.com"
 *               licenseNumber:
 *                 type: string
 *                 example: "ABCD1234"
 *               vehicleDetails:
 *                 type: string
 *                 example: "Toyota Prius, Plate XYZ"
 *               kycStatus:
 *                 type: string
 *                 example: "Pending"
 *               addressLine1:
 *                 type: string
 *                 example: "123 Main St"
 *               addressLine2:
 *                 type: string
 *                 example: "Apt 4B"
 *               city:
 *                 type: string
 *                 example: "San Francisco"
 *               state:
 *                 type: string
 *                 example: "CA"
 *               country:
 *                 type: string
 *                 example: "USA"
 *               zipCode:
 *                 type: string
 *                 example: "94103"
 *               active:
 *                 type: boolean
 *                 example: true
 *               role:
 *                 type: string
 *                 example: "rider"
 *               acceptingRides:
 *                 type: boolean
 *                 example: false
 *               fcmToken:
 *                 type: string
 *                 example: "driver_fcm_token"
 *     responses:
 *       200:
 *         description: OTP sent for Driver registration
 *       500:
 *         description: Internal server error
 */
router.post('/auth/driver/register', authController.requestDriverRegistrationOTP);

/**
 * @swagger
 * /api/auth/driver/register/verify:
 *   post:
 *     summary: Verify OTP & Create Driver
 *     tags: [DriverAuth]
 *     description: Driver provides phoneNumber + OTP. If valid, create driver record in DB.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 example: "9876543210"
 *               otp:
 *                 type: string
 *                 example: "123456"
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               licenseNumber:
 *                 type: string
 *               vehicleDetails:
 *                 type: string
 *               kycStatus:
 *                 type: string
 *               addressLine1:
 *                 type: string
 *               addressLine2:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               country:
 *                 type: string
 *               zipCode:
 *                 type: string
 *               active:
 *                 type: boolean
 *               role:
 *                 type: string
 *                 example: "rider"
 *               acceptingRides:
 *                 type: boolean
 *               fcmToken:
 *                 type: string
 *     responses:
 *       201:
 *         description: Driver registered successfully
 *       400:
 *         description: Invalid or expired OTP
 *       409:
 *         description: Driver already exists
 *       500:
 *         description: Internal server error
 */
router.post('/auth/driver/register/verify', authController.verifyDriverRegistrationOTP);

/*=======================  DRIVER LOGIN =======================*/

/**
 * @swagger
 * /api/auth/driver/login:
 *   post:
 *     summary: Request OTP for Driver Login
 *     tags: [DriverAuth]
 *     description: Driver provides phoneNumber. Server sends OTP.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 example: "9876543210"
 *     responses:
 *       200:
 *         description: OTP sent for Driver login
 *       404:
 *         description: Driver not found
 *       500:
 *         description: Internal server error
 */
router.post('/auth/driver/login', authController.requestDriverLoginOTP);

/**
 * @swagger
 * /api/auth/driver/login/verify:
 *   post:
 *     summary: Verify OTP & Login Driver
 *     tags: [DriverAuth]
 *     description: Driver provides phoneNumber + OTP. If valid, returns driver details + JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 example: "9876543210"
 *               otp:
 *                 type: string
 *                 example: "654321"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 driver:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     phoneNumber:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                        type: string
 *                     active:
 *                        type: boolean
 *       400:
 *         description: Invalid or expired OTP
 *       404:
 *         description: Driver not found
 *       500:
 *         description: Internal server error
 */
router.post('/auth/driver/login/verify', authController.verifyDriverLoginOTP);

module.exports = router;
