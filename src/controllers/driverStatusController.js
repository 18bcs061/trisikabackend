const driverStatusService = require('../services/driverStatusService');

exports.updateDriverStatus = async (req, res) =>{
    await driverStatusService.updateDriverStatusService(req, res);
}
