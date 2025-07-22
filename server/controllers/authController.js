const jwt = require('jsonwebtoken');

exports.verifyMsg91Token = async (req, res) => {
  try {
    const { token, phone } = req.body;
    
    // In a real implementation, you would verify with MSG91 API
    // For now, we'll simulate successful verification
    console.log(`Verified OTP for phone: ${phone} with token: ${token}`);
    
    // Create JWT token
    const payload = { 
      user: { 
        id: 'admin-id',
        email: 'admin@alladinschirag.com',
        name: 'Admin User',
        phone: phone
      } 
    };
    
    const authToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ 
      message: 'OTP verified successfully', 
      token: authToken,
      user: payload.user
    });

  } catch (err) {
    console.error('OTP verification error:', err);
    res.status(500).json({ 
      message: 'Server error during OTP verification',
      error: err.message 
    });
  }
};