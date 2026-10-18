import express from 'express';
import Service from '../models/Service.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

// GET /api/services (Public)
router.get('/', async (req, res) => {
  try {
    const services = await Service.find().sort({ order: 1 });
    res.json({ success: true, count: services.length, data: services });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch services', error: error.message });
  }
});

// GET /api/services/:slugOrId (Public)
router.get('/:identifier', async (req, res) => {
  try {
    const { identifier } = req.params;
    let service = await Service.findOne({ slug: identifier.toLowerCase() });
    if (!service && identifier.match(/^[0-9a-fA-F]{24}$/)) {
      service = await Service.findById(identifier);
    }
    if (!service) {
      return res.status(404).json({ success: false, message: 'Crop service not found.' });
    }
    res.json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve service', error: error.message });
  }
});

// POST /api/services (Admin)
router.post('/', protectAdmin, async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json({ success: true, data: service });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to create service', error: error.message });
  }
});

// PUT /api/services/:id (Admin)
router.put('/:id', protectAdmin, async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found.' });
    }
    res.json({ success: true, data: service });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to update service', error: error.message });
  }
});

// DELETE /api/services/:id (Admin)
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found.' });
    }
    res.json({ success: true, message: 'Service deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete service', error: error.message });
  }
});

export default router;
