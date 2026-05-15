const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: 'fas fa-concierge-bell',
  },
  hours: {
    type: String,
    default: '',
  },
  contact: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Service', serviceSchema);
