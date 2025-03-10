const { updateUserFCMService, updateDriverFCMService } = require("../services/fcmService");

exports.updateUserFCMToken = async (req, res) => {
  await updateUserFCMService(req, res);
};

exports.updateDriverFCMToken = async (req, res) => {
  await updateDriverFCMService(req, res);
};
