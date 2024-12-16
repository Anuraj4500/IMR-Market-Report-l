const express = require('express');
const router = express.Router();
const { getTestimonials } = require('../controllers/testimonialController');

// Route to fetch testimonials
router.get('/testimonials', getTestimonials);

module.exports = router;
