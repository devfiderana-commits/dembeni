const express = require('express');
const router = express.Router();
const {
  getMessages,
  getMessage,
  createMessage,
  updateMessage,
  deleteMessage,
} = require('../controllers/message.controller');
const { protect, admin } = require('../middleware/auth.middleware');

router.get('/', protect, admin, getMessages);
router.get('/:id', protect, admin, getMessage);
router.post('/', createMessage);
router.put('/:id', protect, admin, updateMessage);
router.delete('/:id', protect, admin, deleteMessage);

module.exports = router;