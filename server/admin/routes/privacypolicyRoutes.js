const express = require('express');
const router = express.Router();
const PrivacyPolicy = require('../models/privacypolicy');

// GET all privacy policies
router.get('/', async (req, res) => {
  try {
    const policies = await PrivacyPolicy.find(); // Fetch all documents from the PrivacyPolicy collection
    res.json(policies); // Send the fetched data as a JSON response
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle errors
  }
});

module.exports = router;