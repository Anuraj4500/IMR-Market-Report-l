const express = require('express');
const router = express.Router();
const { getPublishers } = require('../controllers/publisherController');

// Route to fetch all publishers
router.get('/', getPublishers);

module.exports = router;