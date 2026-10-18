import mongoose from 'mongoose';

const galleryImageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Sugarcane', 'Banana', 'Papaya', 'Watermelon', 'Field Work'],
    default: 'Field Work',
  },
  imageUrl: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    default: '',
    trim: true,
  },
  order: {
    type: Number,
    default: 0,
  },
  isFeatured: {
    type: Boolean,
    default: true,
  }
}, { timestamps: true });

const GalleryImage = mongoose.model('GalleryImage', galleryImageSchema);
export default GalleryImage;
