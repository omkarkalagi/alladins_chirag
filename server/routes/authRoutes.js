const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.post('/verify-msg91', authController.verifyMsg91Token);

module.exports = router;