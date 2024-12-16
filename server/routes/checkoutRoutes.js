const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');

// POST: Create a new checkout
router.post('/', checkoutController.createCheckout);

module.exports = router;
