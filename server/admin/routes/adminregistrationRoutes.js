const express = require("express");
const { createRegistration, updateRegistration, getRegistrationById, getRegistrations, deleteRegistration } = require("../controller/adminregistrationController");

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

// Route to create a new registration
router.post("/login", createRegistration);

// Route to get a registration by ID
router.get("/login/:id", validateId, getRegistrationById);

// Route to update a registration by ID
router.put("/login/:id", validateId, updateRegistration);

// Route to get all registrations
router.get("/login", getRegistrations);

// Route to delete a registration by ID
router.delete("/login/:id", validateId, deleteRegistration);

module.exports = router;


