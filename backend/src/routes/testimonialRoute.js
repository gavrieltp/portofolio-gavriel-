const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialController');

// GET semua testimonial
router.get('/api/testimonials', testimonialController.getTestimonials);

module.exports = router;