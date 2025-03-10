// Models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true, unique: true },
  name: { type: String },
  email: { type: String },
  role: { type: String, enum: ['rider', 'user', 'admin'], default: 'user' },
  active: { type: Boolean, default: true },
  fcmToken: { type: String , default: ''},
  currentLatitude: { type: Number, default: null },
  currentLongitude: { type: Number, default: null },
  isPhoneVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
