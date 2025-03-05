const mongoose = require("mongoose");

const RideSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: "Driver", required: false},
  vehicleType: { type: String, required: false },
  pickupLat: { type: Number, required: true },
  pickupLong: { type: Number, required: true },
  dropLat: { type: Number, required: true },
  dropLong: { type: Number, required: true },
  fare: { type: Number, required: true },
  distance: { type: Number, required: true },
  rideTime: { type: Number, required: true }, // in minutes
  rideStatus: { type: String, enum: ["pending", "accepted", "ongoing", "completed", "cancelled"], default: "pending" },
  startTime: { type: Date },
  startLat: { type: Number },
  startLong: { type: Number },
  endTime: { type: Date , default:null},
  endLat: { type: Number , default:null },
  endLong: { type: Number , default:null},
  rating: { type: Number, min: 1, max: 5 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Ride", RideSchema);
