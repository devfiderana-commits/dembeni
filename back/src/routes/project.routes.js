const express = require('express');
const router = express.Router();

const {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/project.controller');

const { protect, admin } = require('../middleware/auth.middleware');

router.get('/', getProjects);
router.post('/', protect, admin, createProject);
router.put('/:id', protect, admin, updateProject);
router.delete('/:id', protect, admin, deleteProject);

module.exports = router;