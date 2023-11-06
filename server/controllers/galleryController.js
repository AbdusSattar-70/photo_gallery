/* eslint-disable consistent-return */
const Gallery = require('../models/Gallery.model');
const errorHandler = require('../utils/errorHandler');

const createGallery = async (req, res, next) => {
  try {
    const gallary = await Gallery.create(req.body);
    res.status(200).json({
      data: gallary,
      code: 200,
    });
  } catch (error) {
    next(errorHandler(500, 'Internal server Error'));
  }
};

const getGallery = async (req, res, next) => {
  try {
    const gallary = await Gallery.findById(req.params.id);
    if (!gallary) {
      return next(errorHandler(404, 'Gallery not found!'));
    }
    res.status(200).json(gallary);
  } catch (error) {
    next(error);
  }
};

const getGalleries = async (req, res, next) => {
  try {
    const gallaries = await Gallery.find();
    return res.status(200).json(gallaries);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createGallery,
  getGalleries,
  getGallery,
};