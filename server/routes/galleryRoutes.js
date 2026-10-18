import express from 'express';
import GalleryImage from '../models/GalleryImage.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

// GET /api/gallery (Public)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = {};
    if (category && category !== 'All') {
      filter.category = category;
    }

    const images = await GalleryImage.find(filter).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, count: images.length, data: images });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch gallery images', error: error.message });
  }
});

// POST /api/gallery (Admin)
router.post('/', protectAdmin, async (req, res) => {
  try {
    const image = await GalleryImage.create(req.body);
    res.status(201).json({ success: true, data: image });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to add gallery image', error: error.message });
  }
});

// PUT /api/gallery/:id (Admin)
router.put('/:id', protectAdmin, async (req, res) => {
  try {
    const image = await GalleryImage.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!image) {
      return res.status(404).json({ success: false, message: 'Gallery image not found.' });
    }
    res.json({ success: true, data: image });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to update gallery image', error: error.message });
  }
});

// DELETE /api/gallery/:id (Admin)
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    const image = await GalleryImage.findByIdAndDelete(req.params.id);
    if (!image) {
      return res.status(404).json({ success: false, message: 'Gallery image not found.' });
    }
    res.json({ success: true, message: 'Gallery image deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete gallery image', error: error.message });
  }
});

export default router;
