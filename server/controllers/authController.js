const User = require('../models/User');
const jwt = require('jsonwebtoken');
const twilio = require('twilio');

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Only your credentials allowed
    if (email !== 'omkardigambar4@gmail.com' || password !== 'omkar') {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiry = Date.now() + 300000; // 5 min expiry

    // Upsert user with OTP (hardcoded phone number)
    const phone = '+917624828106';
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, phone, otp, otpExpiry, password: 'omkar', name: 'Omkar' });
    } else {
      user.otp = otp;
      user.otpExpiry = otpExpiry;
      user.phone = phone;
    }
    await user.save();

    // ✅ Send OTP via Twilio
    const message = await client.messages.create({
      body: `Sent from your Alladins Chirag - Your OTP is: ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone
    });

    console.log('OTP sent:', otp, 'Twilio SID:', message.sid);

    res.json({ message: 'OTP sent successfully', userId: user._id });

  } catch (err) {
    console.error('OTP send error:', err.message, err);
    res.status(500).send('Server error');
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if (user.otp != otp || Date.now() > user.otpExpiry) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Generate JWT
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Clear OTP
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.json({ message: 'OTP verified', token });

  } catch (err) {
    console.error('OTP verify error:', err.message, err);
    res.status(500).send('Server error');
  }
};
