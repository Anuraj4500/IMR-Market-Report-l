const express = require("express");
const { createService, upload } = require("../controller/adminourservicesController");

const router = express.Router();

// Route to create a new service
router.post("/ourservices", upload.single("picture"), createService);

module.exports = router;
