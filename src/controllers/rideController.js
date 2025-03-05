const {bookRideService} = require('../services/rideService')

exports.bookRide = async (req, res) => {
    console.log("🟢 bookRide function executed"); // Debug log
    console.log("📌 User ID from authMiddleware:", req.user);
    await bookRideService(req, res);
  };

