const express = require('express');
const router = express.Router();
const { getRefundPolicies } = require('../controllers/refundController');


// Define the route for fetching refund policies
router.get('/', getRefundPolicies);

module.exports = router; 