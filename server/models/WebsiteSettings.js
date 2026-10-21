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
    default: '+91 79753 05677',
    trim: true,
  },
  whatsappNumber: {
    type: String,
    default: '917975305677',
    trim: true,
  },
  location: {
    type: String,
    default: 'Tadkal road, Aland, Karnataka 585302',
    trim: true,
  },
  address: {
    type: String,
    default: 'Sri Nandi Krishi Organic Enterprises, Tadkal Road, Aland, Karnataka 585302',
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
  mapUrl: {
    type: String,
    default: 'https://maps.app.goo.gl/X7TSxQT93axMuCXV6?g_st=ic',
    trim: true,
  },
  mapEmbedUrl: {
    type: String,
    default: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15234.0!2d76.5678524!3d17.5632704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc8ad6fb5ccdc6f%3A0x22c769fe7d935575!2sSri%20Nandi%20Krishi%20organic%20enterprises%20Aland!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
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
