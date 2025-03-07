const OTPModel = require('../Models/OTP');
require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid , authToken)


const sendSMS = async (number , body) => {
  let msgOptions = {
    from: process.env.TWILIO_FROM_NUMBER,
    to: number,
    body
  };
  
  try{
    const message = await client.messages.create(msgOptions)
    
  } catch (err) {
    console.log(err);
  }
}

async function generateOTP(phoneNumber) {
  // const otp = (Math.floor(100000 + Math.random() * 900000)).toString();
  const otp = '123456';
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
  await OTPModel.create({ phoneNumber, otp, expiresAt });
  await sendSMS(phoneNumber, `Your OTP is ${otp}, valid for 5 minutes`);
}

async function verifyOTP(phoneNumber, inputOTP) {
  const record = await OTPModel.findOne({ phoneNumber }).sort({ createdAt: -1 });
  if (!record) return false;
  if (new Date() > record.expiresAt) return false;
  return record.otp === inputOTP;
}

module.exports = { generateOTP, verifyOTP };
