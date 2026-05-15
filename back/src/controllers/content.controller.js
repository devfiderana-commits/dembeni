const News = require('../models/news.model');
const Service = require('../models/service.model');

exports.getNews = async (req, res) => {
  try {
    const news = await News.find().sort({ publishedAt: -1 });
    res.status(200).json({ success: true, news });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createNews = async (req, res) => {
  try {
    const news = await News.create(req.body);
    res.status(201).json({ success: true, news });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateNews = async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!news) {
      return res.status(404).json({ success: false, message: 'Actualité introuvable' });
    }
    res.status(200).json({ success: true, news });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteNews = async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) {
      return res.status(404).json({ success: false, message: 'Actualité introuvable' });
    }
    res.status(200).json({ success: true, message: 'Actualité supprimée' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ title: 1 });
    res.status(200).json({ success: true, services });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json({ success: true, service });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service introuvable' });
    }
    res.status(200).json({ success: true, service });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service introuvable' });
    }
    res.status(200).json({ success: true, message: 'Service supprimé' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
