const {
    updateDriverLocationService,
    updateUserLocationService
  } = require('../services/locationService'); // Ensure this path is correct

exports.updateDriverLocation = async (req, res) => {
    await updateDriverLocationService(req, res);
  };

exports.updateUserLocation = async (req, res) => {
    await updateUserLocationService(req, res);
 };