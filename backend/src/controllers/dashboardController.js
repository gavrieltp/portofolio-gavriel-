const dashboardModel = require("../models/dashboardModel");

const getDashboardStats = (req, res) => {
  dashboardModel.getDashboardStats((err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Gagal mengambil statistik dashboard", error: err.message });
    }

    res.json({ success: true, message: "Statistik dashboard berhasil diambil", data: results });
  });
};

module.exports = { getDashboardStats };
