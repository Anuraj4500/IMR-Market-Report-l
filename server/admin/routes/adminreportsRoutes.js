const express = require('express');
const multer = require("multer");
const adminReportsController = require('../controller/adminreportsController');
const uploadReports = require('../controller/adminreportsController').uploadReports; // Ensure uploadReports is a function
const duplicateCheckerController = require('../controller/duplicateCheckerController');

const router = express.Router();
const upload = multer({ dest: "uploads/" });


router.post('/upload', upload.single('file'), uploadReports);


// POST: Create a new report
router.post('/create', adminReportsController.createReport);

// GET: Get all reports
router.get('/', adminReportsController.getAllReports);

// GET: Get a single report by ID
router.get('/:id', adminReportsController.getReportById); // This line is correct

// PUT: Update a report by ID
router.put("/update/:id", adminReportsController.updateReport);

// DELETE: Delete a report by ID
router.delete('/:id', adminReportsController.deleteReport);

// New route for checking duplicates and creating Excel
router.post('/check-duplicates', upload.single('file'), duplicateCheckerController.checkDuplicatesAndCreateExcel);

module.exports = router;