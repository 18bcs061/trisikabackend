const Ride = require("../Models/Ride");

const bookRideService = async (req, res) => {
  try {
    const { pickupLat, pickupLong, dropLat, dropLong, vehicleType , distance , rideTime , fare } = req.body;
    console.log("req.user.userId" ,req.user);
    
    const userId = req.user.userId; // Extract user ID from token

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

    res.status(200).json({
      success: true,
      message: "waiting for the driver to accept",
      ride: newRide
    });

  } catch (error) {
    console.error("Error booking ride:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.bookRideService = bookRideService