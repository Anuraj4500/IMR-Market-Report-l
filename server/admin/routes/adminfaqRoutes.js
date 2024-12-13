const express = require("express");
const router = express.Router();
const { createFaq, fetchAllFaq, fetchFaqById, updateFaq, deleteFaq } = require("../controller/adminfaqController");

router.post('/create', createFaq);
router.get('/', fetchAllFaq);
router.get('/:id', fetchFaqById);
router.put('/update/:id', updateFaq);
router.delete('/:id', deleteFaq);

module.exports = router; // Ensure this exports only the router
