import express from 'express';
import Booking from '../models/Booking.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

// POST /api/bookings (Public - saves form to MongoDB)
router.post('/', async (req, res) => {
  try {
    const { name, phone, email, crop, area, preferredDate, message } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ success: false, message: 'Name and phone number are required.' });
    }

    const booking = await Booking.create({
      name,
      phone,
      email: email || '',
      crop: crop || 'Sugarcane',
      area: area || '',
      preferredDate: preferredDate || null,
      message: message || '',
    });

    res.status(201).json({
      success: true,
      message: 'Consultation request submitted successfully.',
      data: booking,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to submit booking', error: error.message });
  }
});

// GET /api/bookings (Admin)
router.get('/', protectAdmin, async (req, res) => {
  try {
    const { status, crop } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (crop) filter.crop = crop;

    const bookings = await Booking.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: bookings.length, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch bookings', error: error.message });
  }
});

// GET /api/bookings/:id (Admin)
router.get('/:id', protectAdmin, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found.' });
    }
    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch booking', error: error.message });
  }
});

// PATCH /api/bookings/:id/status (Admin)
router.patch('/:id/status', protectAdmin, async (req, res) => {
  try {
    const { status, notes } = req.body;
    const validStatuses = ['New', 'Contacted', 'Confirmed', 'Completed', 'Cancelled'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
    }

    const updateData = {};
    if (status) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;

    const booking = await Booking.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found.' });
    }

    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to update booking status', error: error.message });
  }
});

// DELETE /api/bookings/:id (Admin)
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found.' });
    }
    res.json({ success: true, message: 'Booking deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete booking', error: error.message });
  }
});

export default router;
