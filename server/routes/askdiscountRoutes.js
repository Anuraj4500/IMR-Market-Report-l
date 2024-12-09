const express = require('express');
const router = express.Router();
const {submitAskDiscount,getAllAskDiscounts,getAskDiscountById,deleteAskDiscountById} = require('../controllers/askdiscountcontroller');

// POST - Create a new discount request
router.post('/', submitAskDiscount);

// GET - Retrieve all discount requests
router.get('/', getAllAskDiscounts);

// GET - Retrieve a specific discount request by ID
router.get('/:id', getAskDiscountById);

// PUT - Update a discount request by ID

// DELETE - Delete a discount request by ID
    router.delete('/:id', deleteAskDiscountById);

module.exports = router;
