const express = require('express');
const createGallery = require('../controllers/galleryController');

const router = express.Router();

router.post('/create', createGallery);

module.exports = router;