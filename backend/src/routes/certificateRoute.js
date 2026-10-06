const express = require('express');
const router = express.Router();
const certificateController = require('../controllers/certificateController');

// GET semua sertifikat
router.get('/api/certificates', certificateController.getCertificates);

module.exports = router;