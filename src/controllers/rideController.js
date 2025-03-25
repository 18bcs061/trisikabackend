const {bookRideService , calculateFareService} = require('../services/rideService')

exports.bookRide = async (req, res) => {
    await bookRideService(req, res);
  };

exports.calculateFare = async (req, res) => {
    await calculateFareService(req, res);
};  

