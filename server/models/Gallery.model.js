const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrls: {
      type: Array,
      required: true,
    },
    private: {
      type: Boolean,

    },
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Gallery = mongoose.model('Gallery', GallerySchema);

module.exports = Gallery;