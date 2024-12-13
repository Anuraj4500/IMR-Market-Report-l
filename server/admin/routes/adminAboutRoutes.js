const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { createAbout, fetchAllAbout, fetchAboutById, updateAbout, deleteAbout } = require('../controller/adminAboutController');

// Enhanced file upload storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/client_images');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// File upload validation middleware
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'), false);
    }
};

const upload = multer({ 
    storage: storage, 
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB file size limit
});

// Specific upload configuration for this route
const aboutUpload = upload.fields([
    { name: 'image_1', maxCount: 1 }, 
    { name: 'image_2', maxCount: 1 }
]);

// Route with upload middleware
router.post('/create', aboutUpload, createAbout);

router.get('/', fetchAllAbout);
router.get('/:id', fetchAboutById);

// Update route with correct upload middleware
router.put('/update/:id', aboutUpload, updateAbout);

router.delete('/:id', deleteAbout);

module.exports = router;
