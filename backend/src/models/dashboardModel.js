const db = require("../config/db");

const getDashboardStats = (callback) => {
  const query = `SELECT
    (SELECT COUNT(*) FROM projects) AS totalProjects,
    (SELECT COUNT(*) FROM skills) AS totalSkills,
    (SELECT COUNT(*) FROM certificates) AS totalCertificates,
    (SELECT COUNT(*) FROM testimonials) AS totalTestimonials,
    (SELECT COUNT(*) FROM contacts) AS totalMessages`;

  db.query(query, (err, results) => callback(err, results[0]));
};

module.exports = { getDashboardStats };
