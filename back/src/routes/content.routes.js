const express = require('express');
const router = express.Router();
const {
  getNews,
  createNews,
  updateNews,
  deleteNews,
  getServices,
  createService,
  updateService,
  deleteService,
} = require('../controllers/content.controller');
const { protect, admin } = require('../middleware/auth.middleware');

router.get('/news', getNews);
router.post('/news', protect, admin, createNews);
router.put('/news/:id', protect, admin, updateNews);
router.delete('/news/:id', protect, admin, deleteNews);

router.get('/services', getServices);
router.post('/services', protect, admin, createService);
router.put('/services/:id', protect, admin, updateService);
router.delete('/services/:id', protect, admin, deleteService);

module.exports = router;
