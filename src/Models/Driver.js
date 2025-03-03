const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  licenseNumber: { type: String },
  vehicleDetails: { type: String },
  kycStatus: { type: String, default: 'Pending' },
  addressLine1: { type: String },
  addressLine2: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  zipCode: { type: String },
  active: { type: Boolean, default: true },
  role: { type: String, enum: ['rider', 'user', 'admin'], default: 'rider' },
  acceptingRides: { type: Boolean, default: false },
  fcmToken: { type: String },
  isPhoneVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Driver', driverSchema);
