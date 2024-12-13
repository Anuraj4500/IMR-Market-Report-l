const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

// Login route
router.post('/admin/login', authController.login);

module.exports = router;
