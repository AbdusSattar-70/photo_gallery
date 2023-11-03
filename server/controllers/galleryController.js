/* eslint-disable consistent-return */
const Gallery = require('../models/Gallery.model');

const createGallery = async (req, res, next) => {
  try {
    const gallary = await Gallery.create(req.body);
    return res.status(201).json(gallary);
  } catch (error) {
    next(error);
  }
};

module.exports = createGallery;