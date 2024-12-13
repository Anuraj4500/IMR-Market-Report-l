const express = require("express");
const router = express.Router();
const { getAllRequests, getAllCheckouts, getAllDiscount, deleteRequests, deleteCheckouts, deleteDiscount } = require("../controller/adminLeadController");


router.get('/requests', getAllRequests);
router.get('/checkouts', getAllCheckouts);
router.get('/discount', getAllDiscount);
router.delete('/requests/:id', deleteRequests);
router.delete('/checkouts/:id', deleteCheckouts);
router.delete('/discount/:id', deleteDiscount);



module.exports = router; // Ensure this exports only the router

