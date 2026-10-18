import express from 'express';
import ContactMessage from '../models/ContactMessage.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

// POST /api/contact (Public)
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message, crop } = req.body;
    if (!name || (!email && !phone)) {
      return res.status(400).json({ success: false, message: 'Name and phone number or email are required.' });
    }

    const contact = await ContactMessage.create({
      name,
      email: email || `${(phone || 'farmer').replace(/[^a-zA-Z0-9]/g, '')}@farmer.srinandikrishi.com`,
      phone: phone || '',
      subject: subject || (crop ? `Consultation Enquiry for ${crop}` : 'Agricultural Consultation Enquiry'),
      message: message || (crop ? `Consultation request for ${crop} farming.` : 'Agricultural guidance requested.'),
    });

    res.status(201).json({
      success: true,
      message: 'Your message has been received. Our agricultural team will contact you shortly.',
      data: contact,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to send message', error: error.message });
  }
});

// GET /api/contact (Admin)
router.get('/', protectAdmin, async (req, res) => {
  try {
    const { status } = req.query;
    const filter = {};
    if (status) filter.status = status;

    const messages = await ContactMessage.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch contact messages', error: error.message });
  }
});

// PATCH /api/contact/:id/status (Admin)
router.patch('/:id/status', protectAdmin, async (req, res) => {
  try {
    const { status, notes } = req.body;
    const validStatuses = ['New', 'Read', 'Replied'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: `Status must be one of: ${validStatuses.join(', ')}` });
    }

    const updateData = {};
    if (status) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;

    const message = await ContactMessage.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found.' });
    }

    res.json({ success: true, data: message });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to update message status', error: error.message });
  }
});

// DELETE /api/contact/:id (Admin)
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found.' });
    }
    res.json({ success: true, message: 'Message deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete message', error: error.message });
  }
});

export default router;
