const express = require('express');
const router = express.Router();
const { getWhyChooseUsData } = require('../controllers/whychooseusController');

// Fetch all data from the WhyChooseUs collection
router.get('/', getWhyChooseUsData);

module.exports = router;
