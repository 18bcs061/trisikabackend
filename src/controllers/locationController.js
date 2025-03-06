const {
    updateDriverLocationService
  } = require('../services/locationService'); // Ensure this path is correct

exports.updateDriverLocation = async (req, res) => {
    await updateDriverLocationService(req, res);
  };