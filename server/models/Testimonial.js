import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Author name is required'],
    trim: true,
  },
  role: {
    type: String,
    default: 'Farmer',
    trim: true,
  },
  crop: {
    type: String,
    default: 'Sugarcane',
    trim: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5,
  },
  text: {
    type: String,
    required: [true, 'Testimonial content is required'],
    trim: true,
  },
  location: {
    type: String,
    default: '',
    trim: true,
  },
  isFeatured: {
    type: Boolean,
    default: true,
  },
  order: {
    type: Number,
    default: 0,
  }
}, { timestamps: true });

const Testimonial = mongoose.model('Testimonial', testimonialSchema);
export default Testimonial;
