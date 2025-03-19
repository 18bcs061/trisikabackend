const Ride = require("../Models/Ride");
const Driver = require("../Models/Driver");

const bookRideService = async (req, res) => {
  try {
    const { pickupLat, pickupLong, dropLat, dropLong, vehicleType, distance, rideTime, fare } = req.body;
    const userId = req.user.userId;

    if (!pickupLat || !pickupLong || !dropLat || !dropLong || !vehicleType) {
      return res.status(400).json({ error: "All fields are required" });
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

    const maxDistanceInMeters = 3000; // 3 km
    const availableDrivers = await Driver.find({
      active: true,
      currentLatitude: { $ne: null },
      currentLongitude: { $ne: null },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [pickupLong, pickupLat] 
          },
          $maxDistance: maxDistanceInMeters
        }
      }
    }).select("name phoneNumber currentLatitude currentLongitude vehicleDetails fcmToken");

    res.status(200).json({
      success: true,
      message: "waiting for the driver to accept",
      ride: newRide,
      availableDrivers
    });

  } catch (error) {
    console.error("Error booking ride:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.bookRideService = bookRideService;
