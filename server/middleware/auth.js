const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Get token from header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ success: false, message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // sets req.user.id = decoded.id
    next();
  } catch (err) {
    console.error('JWT auth error:', err);
    res.status(401).json({ success: false, message: 'Token is not valid' });
  }
};
