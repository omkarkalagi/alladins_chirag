const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate credentials
    if (email !== 'omkardigambar4@gmail.com' || password !== 'omkar') {
      return res.status(401).json({ message: 'Unauthorized user' });
    }

    // Create JWT token
    const payload = { 
      user: { 
        id: 'admin-id',
        email: email,
        name: 'Admin User'
      } 
    };
    
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ 
      message: 'Login successful', 
      token,
      user: {
        name: 'Admin User',
        email: email
      }
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ 
      message: 'Server error during authentication',
      error: err.message 
    });
  }
};