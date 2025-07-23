// errorHandler.js
// Express error handling middleware

module.exports = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
}; 