const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/CheckoutController');

// POST: Create a new checkout
router.post('/', checkoutController.createCheckout);

module.exports = router;
