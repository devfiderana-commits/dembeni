const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Le nom est requis'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'L\'email est requis'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email invalide'],
  },
  subject: {
    type: String,
    required: [true, 'Le sujet est requis'],
    trim: true,
  },
  message: {
    type: String,
    required: [true, 'Le message est requis'],
    trim: true,
  },
  status: {
    type: String,
    enum: ['unread', 'read', 'replied'],
    default: 'unread',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  repliedAt: {
    type: Date,
  },
  reply: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model('Message', messageSchema);