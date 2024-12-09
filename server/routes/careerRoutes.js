const express = require('express');
const { submitCareerForm } = require('../controllers/careerController');
const multer = require('multer');
const upload = multer();

const router = express.Router();

router.post('/careerform', upload.single('file'), submitCareerForm);

module.exports = router;
