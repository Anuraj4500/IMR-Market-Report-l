const express = require("express");
const { createHome, updateHome, getHomeById, getHomes, deleteHome, upload } = require("../controller/adminhomeController");

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

// Route to create a new home
router.post("/home", upload.single("image"), createHome);

// Route to get a home by ID
router.get("/home/:id", validateId, getHomeById);

// Route to update a home by ID
router.put("/home/:id", upload.single("image"), updateHome);

// Route to get all homes
router.get("/home", getHomes);

// Route to delete a home by ID
router.delete("/home/:id", validateId, deleteHome);

module.exports = router;


