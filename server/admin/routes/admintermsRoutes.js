const express = require("express");
const { createTerm, updateTerm, getTermById, getTerms, deleteTerm } = require("../controller/admintermsController");

const router = express.Router();

// Middleware to validate the `id` parameter
const validateId = (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID format. ID must be a number." });
    }
    req.params.id = id; // Convert `id` to a number
    next();
};

// Route to create a new terms
router.post("/terms", createTerm);

// Route to get a terms by ID
router.get("/terms/:id", validateId, getTermById);

// Route to update a terms by ID
router.put("/terms/:id", validateId, updateTerm);

// Route to get all terms
router.get("/terms", getTerms);

// Route to delete a terms by ID
router.delete("/terms/:id", validateId, deleteTerm);

module.exports = router;


