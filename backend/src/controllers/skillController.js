const skillModel = require('../models/skillModel');

const getSkills = (req, res) => {
    skillModel.getAllSkills((err, results) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Gagal mengambil data skill',
                error: err.message,
            });
        }
        res.status(200).json({
            success: true,
            message: 'Data skill berhasil diambil',
            data: results
        });
    });
};

module.exports = {
    getSkills
};