const express = require('express');
const router = express.Router();
const { submitSampleRequest, getAllSampleRequests, getSampleRequestById, deleteSampleRequestById } = require('../controllers/sampleRequestcontroller');

// Create a new sample request
router.post('/', submitSampleRequest);

// Get all sample requests
router.get('/', getAllSampleRequests);

// Get a single sample request by ID
router.get('/:id', getSampleRequestById);

// Delete a sample request by ID
router.delete('/:id', deleteSampleRequestById);

module.exports = router;
