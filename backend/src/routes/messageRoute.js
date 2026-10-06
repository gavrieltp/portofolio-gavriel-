const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// POST kirim pesan
router.post('/api/messages', messageController.sendMessage);

// GET semua pesan
router.get('/api/messages', messageController.getMessages);

module.exports = router;