const express = require('express');
const multer = require("multer");
const adminReportsController = require('../controller/adminreportsController');
const duplicateCheckerController = require('../controller/duplicateCheckerController');

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post('/uploads', upload.single('file'), adminReportsController.uploadReports);

router.post('/check-duplicates', upload.single('file'), duplicateCheckerController.checkDuplicatesAndCreateExcel);


module.exports = router;