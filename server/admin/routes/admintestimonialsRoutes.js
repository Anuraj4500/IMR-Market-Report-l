const express = require("express");
const { createTestimonial, updateTestimonial, getTestimonialById, getTestimonials, deleteTestimonials } = require("../controller/admintestimonialsController");

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

// Route to create a new testimonial
router.post("/testimonials", createTestimonial);

// Route to get a testimonial by ID
router.get("/testimonials/:id", validateId, getTestimonialById);

// Route to update a testimonial by ID
router.put("/testimonials/:id", validateId, updateTestimonial);

// Route to get all testimonials
router.get("/testimonials", getTestimonials);

// Route to delete a testimonial by ID
router.delete("/testimonials/:id", validateId, deleteTestimonials);

module.exports = router;

