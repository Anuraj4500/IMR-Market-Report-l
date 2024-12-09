const express = require('express');
const { getOurServices } = require('../controllers/ourservicescontroller');

const router = express.Router();

// Define the route for fetching our services
router.get('/', getOurServices);

module.exports = router; 