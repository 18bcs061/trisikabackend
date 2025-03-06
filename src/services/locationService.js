const Driver = require('../Models/Driver');


const updateDriverLocationService = async (req, res) => {
  try {
    const { currentLatitude, currentLongitude } = req.body;
   
    
    const driverId = req.user.driverId;

    if (currentLatitude == null || currentLongitude == null) {
      return res.status(400).json({ error: "currentLatitude and currentLongitude are required" });
    }

    const driver = await Driver.findByIdAndUpdate(
      driverId,
      { currentLatitude, currentLongitude, updatedAt: Date.now() },
      { new: true }
    );
    

    if (!driver) {
      return res.status(404).json({ error: "Driver not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Driver location updated successfully",
      driver: {
        _id: driver._id,
        currentLatitude: driver.currentLatitude,
        currentLongitude: driver.currentLongitude,
        updatedAt: driver.updatedAt
      }
    });
  } catch (error) {
    console.error("Error updating driver location:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateDriverLocationService = updateDriverLocationService

