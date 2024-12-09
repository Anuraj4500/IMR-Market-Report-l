const express = require('express');
const router = express.Router();
const { getTerms, createTerm } = require('../controllers/termsandconditionscontroller'); // Import the controller functions

// Route to get all terms and conditions
router.get('/', getTerms);
router.post('/', createTerm);

module.exports = router; // Export the router 