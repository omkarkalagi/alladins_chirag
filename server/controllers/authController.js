// authController.js
// WARNING: This authentication logic is for DEMO PURPOSES ONLY.
// TODO: Replace with real user lookup, password hashing, and OTP verification for production use.
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // TODO: Replace with real user lookup and password hash check
    if (email === 'admin@alladinschirag.com' && password === 'admin123') {
      const payload = { 
        user: { 
          id: 'admin-id',
          email: email,
          name: 'Admin User'
        } 
      };
      
      const authToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
      
      res.json({ 
        success: true,
        message: 'Login successful', 
        token: authToken,
        user: payload.user
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.sendOTP = async (req, res) => {
  try {
    const { phone } = req.body;
    // TODO: Integrate with real OTP service and store OTP for verification
    // Simulate OTP sending
    console.log(`Sending OTP to phone: ${phone}`);
    res.json({ success: true, message: 'OTP sent successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { phone, otp } = req.body;
    
    // TODO: Verify OTP from database or cache
    // Simple OTP validation - replace with real verification
    if (otp === '123456') {
      const payload = { 
        user: { 
          id: 'user-id',
          phone: phone,
          name: 'Phone User'
        } 
      };
      
      const authToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
      
      res.json({ 
        success: true,
        message: 'OTP verified successfully', 
        token: authToken,
        user: payload.user
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid OTP' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'OTP verification error' });
  }
};