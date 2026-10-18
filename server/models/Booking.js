import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Farmer/Customer name is required'],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, 'Contact phone number is required'],
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    default: '',
  },
  crop: {
    type: String,
    required: [true, 'Crop category is required'],
    default: 'Sugarcane',
    trim: true,
  },
  area: {
    type: String,
    trim: true,
    default: '',
  },
  preferredDate: {
    type: Date,
  },
  message: {
    type: String,
    trim: true,
    default: '',
  },
  status: {
    type: String,
    enum: ['New', 'Contacted', 'Confirmed', 'Completed', 'Cancelled'],
    default: 'New',
  },
  notes: {
    type: String,
    default: '',
  },
  source: {
    type: String,
    default: 'Website Form',
  }
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
