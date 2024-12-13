const express = require("express");
const { createCareer, updateCareer, getCareerById, getCareers, deleteCareer } = require("../controller/admincareerController");

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

// Route to create a new career
router.post("/career", createCareer);

// Route to get a career by ID
router.get("/career/:id", validateId, getCareerById);

// Route to update a career by ID
router.put("/career/:id", validateId, updateCareer);

// Route to get all careers
router.get("/career", getCareers);

// Route to delete a career by ID
router.delete("/career/:id", validateId, deleteCareer);

module.exports = router;


