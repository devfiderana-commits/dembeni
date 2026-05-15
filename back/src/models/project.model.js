const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['Planification', 'En cours', 'Terminé', 'Suspendu'],
    default: 'Planification',
  },
  budget: {
    type: String,
    default: '',
  },
  completion: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
  },
  location: {
    type: String,
    default: '',
  },
  responsible: {
    type: String,
    default: '',
  },
  details: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Project', projectSchema);