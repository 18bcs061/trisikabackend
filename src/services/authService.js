const { generateOTP, verifyOTP } = require("./otpService");
const User = require("../Models/User");
const Driver = require("../Models/Driver");
const jwt = require("jwt-simple");
const mongoose = require("mongoose");

/*==================================
  USER REGISTRATION FLOW
==================================*/
const requestUserRegistrationOTPService = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const existingUser = await User.findOne({ phoneNumber });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }
    await generateOTP(phoneNumber);
    return res.status(200).json({ message: "OTP sent for User registration" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const verifyUserRegistrationOTPService = async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;
    const isValid = await verifyOTP(phoneNumber, otp);
    if (!isValid) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }
    const existingUser = await User.findOne({ phoneNumber });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }
    const newUser = new User({
      phoneNumber,
    });
    await newUser.save();
    return res.status(200).json({
      success: true,
      message: "User verified successfully",
      User: {
        _id: newUser._id,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const userRegistrationService = async (req, res) => {
  try {
    const { id, name, email, role, active } = req.body;
    const existingUser = await User.findById(new mongoose.Types.ObjectId(id));
    if (existingUser) {
      await User.findByIdAndUpdate(
        new mongoose.Types.ObjectId(id),
        {
          name,
          email,
          role: role || "user",
          active,
          isPhoneVerified: true,
        },
        { new: true, upsert: false }
      );
      return res.status(201).json({ message: "User registered successfully" });
    } else {
      return res
        .status(409)
        .json({ error: "Please register with mobile number" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

/*==================================
  USER LOGIN FLOW
==================================*/
const requestUserLoginOTPService = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return res
        .status(404)
        .json({ error: "No account found please register first" });
    }
    await generateOTP(phoneNumber);
    return res.status(200).json({ message: "OTP sent for User login" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const verifyUserLoginOTPService = async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;
    const isValid = await verifyOTP(phoneNumber, otp);
    if (!isValid) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res
        .status(404)
        .json({ error: "No account found please register first" });
    }
    const payload = { userId: user._id, role: user.role || "rider" };
    const token = jwt.encode(payload, process.env.JWT_SECRET);

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        phoneNumber: user.phoneNumber,
        email: user.email,
        role: user.role,
        active: user.active,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

/*==================================
  DRIVER REGISTRATION FLOW
==================================*/
const requestDriverRegistrationOTPService = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const existingDriver = await Driver.findOne({ phoneNumber });
    if (existingDriver) {
      return res.status(409).json({ error: "Driver already exists" });
    }
    await generateOTP(phoneNumber);
    return res
      .status(200)
      .json({ message: "OTP sent for Driver registration" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const verifyDriverRegistrationOTPService = async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;
    const isValid = await verifyOTP(phoneNumber, otp);
    if (!isValid) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }
    const existingDriver = await Driver.findOne({ phoneNumber });
    if (existingDriver) {
      return res.status(409).json({ error: "Driver already exists" });
    }
    const newDriver = new Driver({
      phoneNumber,
    });
    await newDriver.save();

    return res.status(200).json({
      success: true,
      message: "Driver verified successfully",
      driver: {
        _id: newDriver._id,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const driverRegistrationService = async (req, res) => {
  try {
    const {
      id,
      name,
      email,
      licenseNumber,
      vehicleDetails,
      kycStatus,
      addressLine1,
      addressLine2,
      city,
      state,
      country,
      zipCode,
      active
    } = req.body;

    const existingDriver = await Driver.findById(
      new mongoose.Types.ObjectId(id)
    );
    if (existingDriver) {
      await Driver.findByIdAndUpdate(
        new mongoose.Types.ObjectId(id),
        {
          name,
          email,
          licenseNumber,
          vehicleDetails,
          kycStatus: kycStatus || "Pending",
          addressLine1,
          addressLine2,
          city,
          state,
          country,
          zipCode,
          active: active !== undefined ? active : true,
          role: "driver",
          acceptingRides: false,
          isPhoneVerified: true,
        },
        { new: true, upsert: false }
      );
      return res
        .status(201)
        .json({ message: "Driver registered successfully" });
    } else {
      return res
        .status(409)
        .json({ error: "Please register with mobile number" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

/*==================================
  DRIVER LOGIN FLOW
==================================*/
const requestDriverLoginOTPService = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const driver = await Driver.findOne({ phoneNumber });
    if (!driver) {
      return res
        .status(404)
        .json({ error: "No account found please register first" });
    }
    await generateOTP(phoneNumber);
    return res.status(200).json({ message: "OTP sent for Driver login" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const verifyDriverLoginOTPService = async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;
    const isValid = await verifyOTP(phoneNumber, otp);
    if (!isValid) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }
    const driver = await Driver.findOne({ phoneNumber });
    if (!driver) {
      return res
        .status(404)
        .json({ error: "No account found please register first" });
    }
    const payload = { driverId: driver._id, role: "driver" };
    const token = jwt.encode(payload, process.env.JWT_SECRET);
    return res.status(200).json({
      message: "Login successful",
      token,
      driver: {
        _id: driver._id,
        name: driver.name,
        phoneNumber: driver.phoneNumber,
        email: driver.email,
        active: driver.active,
        role: driver.role,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.requestUserRegistrationOTPService = requestUserRegistrationOTPService;
exports.verifyUserRegistrationOTPService = verifyUserRegistrationOTPService;
exports.requestUserLoginOTPService = requestUserLoginOTPService;
exports.verifyUserLoginOTPService = verifyUserLoginOTPService;
exports.requestDriverRegistrationOTPService =
  requestDriverRegistrationOTPService;
exports.verifyDriverRegistrationOTPService = verifyDriverRegistrationOTPService;
exports.requestDriverLoginOTPService = requestDriverLoginOTPService;
exports.verifyDriverLoginOTPService = verifyDriverLoginOTPService;
exports.userRegistrationService = userRegistrationService;
exports.driverRegistrationService = driverRegistrationService;
