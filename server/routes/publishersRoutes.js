const express = require('express');
const router = express.Router();
const { fetchAllPublishers } = require('../controllers/publisherController');

// Route to fetch all publishers
router.get('/', fetchAllPublishers);

module.exports = router;