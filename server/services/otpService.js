const twilio = require('twilio');
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

exports.sendOTPViaTwilio = async (phone, otp) => {
  await client.messages.create({
    body: `Your Alladins Chirag OTP is ${otp}. Valid for 5 minutes.`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phone
  });
};
