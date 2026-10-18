import mongoose from 'mongoose';

const websiteSettingsSchema = new mongoose.Schema({
  businessName: {
    type: String,
    default: 'Sri Nandi Krishi Organic Enterprise',
    trim: true,
  },
  tagline: {
    type: String,
    default: 'Better Farming. Brighter Tomorrow.',
    trim: true,
  },
  email: {
    type: String,
    default: 'srinandikrushi70@gmail.com',
    trim: true,
  },
  phone: {
    type: String,
    default: '+91 98765 43210',
    trim: true,
  },
  whatsappNumber: {
    type: String,
    default: '919876543210',
    trim: true,
  },
  location: {
    type: String,
    default: 'Karnataka, India',
    trim: true,
  },
  address: {
    type: String,
    default: 'Agricultural Consultation Center, Karnataka, India',
    trim: true,
  },
  workingHours: {
    type: String,
    default: 'Mon - Sat: 8:00 AM - 6:00 PM',
    trim: true,
  },
  websiteUrl: {
    type: String,
    default: 'https://srinandikrishi.com',
    trim: true,
  },
  facebookUrl: {
    type: String,
    default: 'https://www.facebook.com/share/19CwgVuDLW/?mibextid=wwXIfr',
    trim: true,
  },
  instagramUrl: {
    type: String,
    default: 'https://www.instagram.com/sri_nandi_krishi_bio_fertilser?igsh=eHBrcG5jemNhYzF3&utm_source=qr&wa_status_inline=true',
    trim: true,
  },
  youtubeUrl: {
    type: String,
    default: '',
    trim: true,
  },
  linkedinUrl: {
    type: String,
    default: '',
    trim: true,
  },
  twitterUrl: {
    type: String,
    default: '',
    trim: true,
  },
  mapEmbedUrl: {
    type: String,
    default: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3847926.883391741!2d74.12399602499999!3d15.317277!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba35a4c37bf488f%3A0x41f1238a84022b33!2sKarnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
    trim: true,
  },
  developerCredit: {
    type: String,
    default: 'Designed and developed by bookmywebsite.in',
  },
  developerUrl: {
    type: String,
    default: 'https://bookmywebsite.in',
  }
}, { timestamps: true });

const WebsiteSettings = mongoose.model('WebsiteSettings', websiteSettingsSchema);
export default WebsiteSettings;
