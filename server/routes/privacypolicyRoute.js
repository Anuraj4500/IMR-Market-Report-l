const express = require('express');
const router = express.Router();
const { getPrivacy } = require('../controllers/privacypolicyController');

router.get('/', getPrivacy);

module.exports = router;