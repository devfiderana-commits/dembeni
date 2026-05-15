const express = require('express');
const router = express.Router();
const {
  getProfile,
  updateProfile,
  deleteAccount,
  getAllUsers,
  deleteUser,
} = require('../controllers/user.controller');
const { protect, admin } = require('../middleware/auth.middleware');

// Protected routes
router.get('/me', protect, getProfile);
router.put('/me', protect, updateProfile);
router.delete('/me', protect, deleteAccount);

// Admin routes
router.get('/', protect, admin, getAllUsers);
router.delete('/:id', protect, admin, deleteUser);

module.exports = router;
