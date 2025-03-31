const Ride = require("../Models/Ride");
const Driver = require("../Models/Driver");
const User = require("../Models/User"); 
const axios = require("axios");
const admin = require("firebase-admin");
require("dotenv").config();

const BASE_FARE = 40;
const PER_KM_RATE = 12;
const PER_MINUTE_RATE = 2; 

const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT,
};
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const bookRideService = async (req, res) => {
  try {
    const { pickupLat, pickupLong, dropLat, dropLong, vehicleType, distance, rideTime, fare } = req.body;
    const userId = req.user.userId;

    if (!pickupLat || !pickupLong || !dropLat || !dropLong || !vehicleType) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = await User.findById(userId).select("name");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Save ride details to MongoDB
    const newRide = new Ride({
      userId,
      pickupLat,
      pickupLong,
      dropLat,
      dropLong,
      vehicleType,
      fare,
      distance,
      rideTime,
      rideStatus: "pending",
      createdAt: Date.now(),
      updatedAt: Date.now()
    });

    await newRide.save();

    // Search for drivers in increasing radius: 1 km → 2 km → 3 km
    const searchDistances = [1000, 2000, 3000];
    let availableDrivers = [];

    for (const maxDistance of searchDistances) {
      availableDrivers = await Driver.find({
        active: true,
        acceptingRides:true,
        currentLatitude: { $ne: null },
        currentLongitude: { $ne: null },
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [pickupLong, pickupLat]
            },
            $maxDistance: maxDistance
          }
        }
      }).select("name phoneNumber currentLatitude currentLongitude vehicleDetails fcmToken");

      if (availableDrivers.length > 0) {
        break; // Stop searching once drivers are found
      }
    }

    if (availableDrivers.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No drivers available nearby",
        ride: newRide,
        availableDrivers: []
      });
    }

    // Get pickup & drop addresses
    const pickupAddress = await getAddressFromLatLng(pickupLat, pickupLong);
    const dropAddress = await getAddressFromLatLng(dropLat, dropLong);

    // Notify available drivers
    await sendFCMNotifications(availableDrivers, user.name, pickupAddress, dropAddress);

    res.status(200).json({
      success: true,
      message: "Waiting for the driver to accept",
      ride: newRide,
      availableDrivers
    });

  } catch (error) {
    console.error("Error booking ride:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAddressFromLatLng = async (lat, lng) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.GOOGLE_MAP_API_KEY}`
    );
     
    return response.data.results[0]?.formatted_address || "Unknown Location";
  } catch (error) {
    console.error("Error fetching address:", error);
    return "Unknown Location";
  }
};


const sendFCMNotifications = async (drivers, userName, pickupAddress, dropAddress) => {
  const messages = drivers.map(driver => ({
    token: driver.fcmToken,
    notification: {
      title: "New Ride Request 🚖",
      body: `${userName} needs a ride from ${pickupAddress} to ${dropAddress}. Tap to accept.`
    },
    data: {
      userName,
      pickupAddress,
      dropAddress,
      rideType: "New Request"
    }
  }));

  try {
    await admin.messaging().sendEach(messages);
    console.log("Notifications sent to available drivers.");
  } catch (error) {
    console.error("Error sending FCM notifications:", error);
  }
};

const calculateFareService = async (req, res) => {
  try {
    const { pickupLat, pickupLong, dropLat, dropLong } = req.body;

    if (!pickupLat || !pickupLong || !dropLat || !dropLong) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Ensure user is authenticated
    const userId = req.user.userId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const googleMapsUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${pickupLat},${pickupLong}&destinations=${dropLat},${dropLong}&key=${process.env.GOOGLE_MAP_API_KEY}`;
    
    const response = await axios.get(googleMapsUrl);
    const data = response.data;

    if (data.status !== "OK") {
      return res.status(500).json({ error: "Failed to fetch distance and time from Google Maps API" });
    }

    const distanceMeters = data.rows[0].elements[0].distance.value;
    const distanceKm = distanceMeters / 1000;
    const durationSeconds = data.rows[0].elements[0].duration.value;
    const durationMinutes = durationSeconds / 60;


    const fare = BASE_FARE + (distanceKm * PER_KM_RATE) + (durationMinutes * PER_MINUTE_RATE);

    res.status(200).json({
      fare: parseFloat(fare.toFixed(2)),
      distance: parseFloat(distanceKm.toFixed(2)),
      estimatedTime: parseFloat(durationMinutes.toFixed(2))
    });

  } catch (error) {
    console.error("Error calculating fare:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.bookRideService = bookRideService;
exports.calculateFareService = calculateFareService;
