const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET semua data hero
router.get('/api/hero', (req, res) => {
  res.json({
    name: 'John Doe',
    peran: 'Web Developer',
    deskripsi: 'Saya seorang pengembang web yang bersemangat dengan pengalaman dalam membangun aplikasi web yang responsif dan fungsional.',
    
  });
});

module.exports = router;