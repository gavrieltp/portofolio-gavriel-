const projectModel = require("../models/projectModel");

const getProjects = (req, res) => {
  projectModel.getAllProjects((err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Gagal mengambil data proyek",
        error: err.message,
      });
    }

    res.json({
      success: true,
      message: "Data proyek berhasil diambil",
      data: results,
    });
  });
};

const getProjectDetail = (req, res) => {
  const { id } = req.params;
  projectModel.getProjectById(id, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Gagal mengambil detail proyek",
        error: err.message,
      });
    }

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Proyek tidak ditemukan",
      });
    }

    res.json({
      success: true,
      message: "Detail proyek berhasil diambil",
      data: result,
    });
  });
};

const projectData = (body) => ({
  title: body.title?.trim(),
  category: body.category?.trim() || null,
  description: body.description?.trim() || null,
  tech: JSON.stringify(Array.isArray(body.tech) ? body.tech : (body.tech || "").split(",").map((item) => item.trim()).filter(Boolean)),
  demo_url: body.demo_url?.trim() || null,
  github_url: body.github_url?.trim() || null,
});

const createProject = (req, res) => {
  const data = projectData(req.body);
  if (!data.title) return res.status(400).json({ success: false, message: "Judul proyek wajib diisi" });
  projectModel.createProject(data, (err, results) => {
    if (err) return res.status(500).json({ success: false, message: "Gagal menambah proyek", error: err.message });
    res.status(201).json({ success: true, message: "Proyek berhasil ditambahkan", data: { id: results.insertId, ...data } });
  });
};

const updateProject = (req, res) => {
  const data = projectData(req.body);
  if (!data.title) return res.status(400).json({ success: false, message: "Judul proyek wajib diisi" });
  projectModel.updateProject(req.params.id, data, (err, results) => {
    if (err) return res.status(500).json({ success: false, message: "Gagal memperbarui proyek", error: err.message });
    if (!results.affectedRows) return res.status(404).json({ success: false, message: "Proyek tidak ditemukan" });
    res.json({ success: true, message: "Proyek berhasil diperbarui" });
  });
};

const deleteProject = (req, res) => {
  projectModel.deleteProject(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ success: false, message: "Gagal menghapus proyek", error: err.message });
    if (!results.affectedRows) return res.status(404).json({ success: false, message: "Proyek tidak ditemukan" });
    res.json({ success: true, message: "Proyek berhasil dihapus" });
  });
};

module.exports = {
  getProjects,
  getProjectDetail,
  createProject,
  updateProject,
  deleteProject,
};
