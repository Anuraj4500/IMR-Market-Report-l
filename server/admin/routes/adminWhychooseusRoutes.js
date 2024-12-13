const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { createWhychooseus, fetchAllWhychooseus, fetchWhychooseusById, updateWhychooseus, deleteWhychooseus } = require('../controller/adminWhychooseusController');

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
const whychooseusUpload = upload.fields([
    { name: 'image', maxCount: 1 }, 
]);

// Route with upload middleware
router.post('/create', whychooseusUpload, createWhychooseus);

router.get('/', fetchAllWhychooseus);
router.get('/:id', fetchWhychooseusById);

// Update route with correct upload middleware
router.put('/update/:id', whychooseusUpload, updateWhychooseus);

router.delete('/:id', deleteWhychooseus);

module.exports = router;
