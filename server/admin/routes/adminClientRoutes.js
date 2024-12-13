const express = require("express");
const router = express.Router();
const { createClient, fetchAllClient, fetchClientById, updateClient, deleteClient } = require("../controller/adminClientController");
const upload = require('multer')({ dest: 'uploads/client_images/' });

router.post('/create', upload.single('image'), createClient);
router.get('/', fetchAllClient);
router.get('/:id', fetchClientById);
router.put('/update/:id', upload.single('image'), updateClient);
router.delete('/:id', deleteClient);

module.exports = router; // Ensure this exports only the router

