const express = require('express');
const router = express.Router();
const { getFaqs, createFaqs } = require('../controllers/faqController');

// Define your routes
router.get('/', getFaqs);
router.post('/', createFaqs);

module.exports = router;
