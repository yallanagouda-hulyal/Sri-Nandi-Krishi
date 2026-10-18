import express from 'express';
import Testimonial from '../models/Testimonial.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

// GET /api/testimonials (Public)
router.get('/', async (_req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, count: testimonials.length, data: testimonials });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch testimonials', error: error.message });
  }
});

// POST /api/testimonials (Admin)
router.post('/', protectAdmin, async (req, res) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    res.status(201).json({ success: true, data: testimonial });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to create testimonial', error: error.message });
  }
});

// PUT /api/testimonials/:id (Admin)
router.put('/:id', protectAdmin, async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found.' });
    }
    res.json({ success: true, data: testimonial });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to update testimonial', error: error.message });
  }
});

// DELETE /api/testimonials/:id (Admin)
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found.' });
    }
    res.json({ success: true, message: 'Testimonial deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete testimonial', error: error.message });
  }
});

export default router;
