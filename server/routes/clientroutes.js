const express = require('express');
const router = express.Router();
const { getClients, createClient  } = require('../controllers/clientcontroller');

// Define the route for getting clients
router.get('/', getClients);
router.post('/', createClient);

module.exports = router;