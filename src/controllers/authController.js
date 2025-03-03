const {
  requestUserRegistrationOTPService,
  verifyUserRegistrationOTPService,
  requestUserLoginOTPService,
  verifyUserLoginOTPService,
  requestDriverRegistrationOTPService,
  verifyDriverRegistrationOTPService,
  requestDriverLoginOTPService,
  verifyDriverLoginOTPService
} = require('../services/authService'); // Ensure this path is correct

/*==================================
  USER REGISTRATION FLOW
==================================*/
exports.requestUserRegistrationOTP = async (req, res) => {
  await requestUserRegistrationOTPService(req, res);
};
exports.verifyUserRegistrationOTP = async (req, res) => {
  await verifyUserRegistrationOTPService(req, res);
};

/*==================================
  USER LOGIN FLOW
==================================*/
exports.requestUserLoginOTP = async (req, res) => {
  await requestUserLoginOTPService(req, res);
};
exports.verifyUserLoginOTP = async (req, res) => {
  await verifyUserLoginOTPService(req, res);
};

/*==================================
  DRIVER REGISTRATION FLOW
==================================*/
exports.requestDriverRegistrationOTP = async (req, res) => {
  await requestDriverRegistrationOTPService(req, res);
};
exports.verifyDriverRegistrationOTP = async (req, res) => {
  await verifyDriverRegistrationOTPService(req, res);
};

/*==================================
  DRIVER LOGIN FLOW
==================================*/
exports.requestDriverLoginOTP = async (req, res) => {
  await requestDriverLoginOTPService(req, res);
};
exports.verifyDriverLoginOTP = async (req, res) => {
  await verifyDriverLoginOTPService(req, res);
};
