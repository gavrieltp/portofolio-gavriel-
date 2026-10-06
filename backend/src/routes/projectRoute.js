const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// GET semua proyek
router.get('/api/projects', projectController.getProjects);
// GET detail proyek berdasarkan ID
router.get('/api/projects/:id', projectController.getProjectDetail);
router.post('/api/projects', projectController.createProject);
router.put('/api/projects/:id', projectController.updateProject);
router.delete('/api/projects/:id', projectController.deleteProject);


module.exports = router;
