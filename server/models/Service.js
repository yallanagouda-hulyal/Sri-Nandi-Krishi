import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  cropName: {
    type: String,
    required: true,
    trim: true,
  },
  subtitle: {
    type: String,
    default: '',
    trim: true,
  },
  shortDescription: {
    type: String,
    required: true,
    trim: true,
  },
  fullDescription: {
    type: String,
    default: '',
  },
  heroImage: {
    type: String,
    default: '',
  },
  cardImage: {
    type: String,
    default: '',
  },
  highlights: [{
    type: String,
    trim: true,
  }],
  cultivationStages: [{
    stepNumber: Number,
    title: String,
    description: String,
  }],
  guidanceDetails: {
    soilAndPreparation: { type: String, default: '' },
    varietySelection: { type: String, default: '' },
    irrigationAndNutrition: { type: String, default: '' },
    pestAndDisease: { type: String, default: '' },
    harvestPlanning: { type: String, default: '' },
  },
  faqs: [{
    question: String,
    answer: String,
  }],
  order: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  }
}, { timestamps: true });

const Service = mongoose.model('Service', serviceSchema);
export default Service;
