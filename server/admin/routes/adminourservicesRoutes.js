const express = require("express");
const multer = require("multer");
const { createService, updateOurService, getServiceById, deleteOurService } = require("../controller/adminourservicesController");

const router = express.Router();

// Middleware to handle file uploads
const upload = multer({
    dest: 'uploads/Our_Services_Images/', // Temporary folder to store uploaded files
});

// Route to create a new service
router.post("/ourservices", upload.single("image"), createService);

// Middleware to validate the id parameter
const validateId = (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID format. ID must be a number.' });
  }
  req.params.id = id; // Update the id to be a number
  next();
};

// Route to get a service by ID
router.get('/ourservices/:id', validateId, getServiceById);

// Route to update a service by ID
router.put('/ourservices/:id', upload.single("image"), updateOurService);

// Route to delete a service by ID
router.delete('/ourservices/:id', validateId, deleteOurService);

module.exports = router;
