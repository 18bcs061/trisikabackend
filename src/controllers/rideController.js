const {bookRideService} = require('../services/rideService')

exports.bookRide = async (req, res) => {
    await bookRideService(req, res);
  };

