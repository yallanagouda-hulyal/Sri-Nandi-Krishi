import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import GalleryImage from '../models/GalleryImage.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const CLEAN_10_GALLERY = [
  {
    title: 'Vibrant Sugarcane Plantation',
    category: 'Sugarcane',
    imageUrl: '/images/sugarcane-field.jpg',
    caption: 'Healthy sugarcane crop with lush vegetative growth and uniform canopy.',
    order: 1,
    isFeatured: true
  },
  {
    title: 'Sugarcane Cultivation Rows',
    category: 'Sugarcane',
    imageUrl: '/images/sugarcane-rows.jpg',
    caption: 'Precision furrow spacing and drip irrigation layout in field.',
    order: 2,
    isFeatured: true
  },
  {
    title: 'Banana Plantation Support',
    category: 'Banana',
    imageUrl: '/images/banana.jpg',
    caption: 'High-density banana plants with healthy bunch setting.',
    order: 3,
    isFeatured: true
  },
  {
    title: 'Commercial Banana Plantation',
    category: 'Banana',
    imageUrl: '/images/hd-banana-plantation.jpg',
    caption: 'High-density G9 tissue culture plantation with vigorous canopy and root development.',
    order: 4,
    isFeatured: true
  },
  {
    title: 'Papaya Orchard Management',
    category: 'Papaya',
    imageUrl: '/images/papaya.jpg',
    caption: 'Heavy fruiting Red Lady papaya trees on elevated drainage beds.',
    order: 5,
    isFeatured: true
  },
  {
    title: 'Red Lady 786 Papaya Orchard',
    category: 'Papaya',
    imageUrl: '/images/papaya-tree.jpg',
    caption: 'Heavy fruit set on high-yielding gynodioecious papaya trees.',
    order: 6,
    isFeatured: true
  },
  {
    title: 'Watermelon Harvest Readiness',
    category: 'Watermelon',
    imageUrl: '/images/watermelon.jpg',
    caption: 'Uniform, high-brix watermelons ready for wholesale dispatch.',
    order: 7,
    isFeatured: true
  },
  {
    title: 'Precision Mulched Watermelon Field',
    category: 'Watermelon',
    imageUrl: '/images/hd-watermelon-field.jpg',
    caption: 'Silver-black mulching film and inline drip fertigation for maximum melon yield.',
    order: 8,
    isFeatured: true
  },
  {
    title: 'Tractor Field Work & Tillage',
    category: 'Field Work',
    imageUrl: '/images/farm-tractor.jpg',
    caption: 'Deep plowing and soil aeration prior to plantation setup.',
    order: 9,
    isFeatured: true
  },
  {
    title: 'Expansive Farmland Planning',
    category: 'Field Work',
    imageUrl: '/images/farm-field.jpg',
    caption: 'Comprehensive field assessment for organic crop guidance.',
    order: 10,
    isFeatured: true
  }
];

async function seedGallery() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/sri_nandi_krishi';
    console.log('Connecting to MongoDB:', mongoUri);
    await mongoose.connect(mongoUri);

    await GalleryImage.deleteMany({});
    console.log('Cleared existing gallery images.');

    await GalleryImage.insertMany(CLEAN_10_GALLERY);
    console.log(`Successfully reset gallery to ${CLEAN_10_GALLERY.length} authentic farm images!`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Failed to seed gallery:', err);
    process.exit(1);
  }
}

seedGallery();
