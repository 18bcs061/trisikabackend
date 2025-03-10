const User = require("../Models/User");
const Driver = require("../Models/Driver");

const updateUserFCMService = async (req, res) => {
  try {
    const { fcmToken } = req.body;
    const userId = req.user.userId

    if (!fcmToken) {
      return res.status(400).json({ error: "FCM Token is required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.fcmToken = fcmToken;
    await user.save();

    res.status(200).json({ success: true, message: "FCM Token updated successfully for user" });
  } catch (error) {
    console.error("Error updating FCM Token for user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateDriverFCMService = async (req, res) => {
  try {
    const { fcmToken } = req.body;
    const driverId = req.user.driverId;

    if (!fcmToken) {
      return res.status(400).json({ error: "FCM Token is required" });
    }

    const driver = await Driver.findById(driverId);
    if (!driver) {
      return res.status(404).json({ error: "Driver not found" });
    }

    driver.fcmToken = fcmToken;
    await driver.save();

    res.status(200).json({ success: true, message: "FCM Token updated successfully for driver" });
  } catch (error) {
    console.error("Error updating FCM Token for driver:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { updateUserFCMService, updateDriverFCMService };
