const testimonialModel = require('../models/testimonialModel');

const getTestimonials = (req, res) => {
    testimonialModel.getAllTestimonials((err, results) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Gagal mengambil data testimonial',
                error: err.message,
            });
        }
        res.status(200).json({
            success: true,
            message: 'Data testimonial berhasil diambil',
            data: results
        });
    });
};

module.exports = {
    getTestimonials
};