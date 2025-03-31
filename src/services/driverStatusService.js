const Driver = require('../Models/Driver');

const updateDriverStatusService = async (req, res) => {
    try {
        const driverId = req.user.driverId;
        const { acceptingRides } = req.body;

        if (typeof acceptingRides !== 'boolean') {
            return res.status(400).json({
                success: false,
                message: 'acceptingRides must be a boolean value'
            });
        }

        const updatedDriver = await Driver.findByIdAndUpdate(
            driverId,
            { acceptingRides },
            { new: true, runValidators: true }
        );

        if (!updatedDriver) {
            return res.status(404).json({
                success: false,
                message: 'Driver not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Driver status updated successfully'
        });
    } catch (error) {
        console.error('Error in updateDriverStatus service:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

module.exports = { updateDriverStatusService };
