import express from 'express';
import WebsiteSettings from '../models/WebsiteSettings.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

// GET /api/settings/public (Public)
router.get('/public', async (_req, res) => {
  try {
    let settings = await WebsiteSettings.findOne();
    if (!settings) {
      settings = await WebsiteSettings.create({});
    }
    res.json({
      success: true,
      data: {
        businessName: settings.businessName,
        tagline: settings.tagline,
        email: settings.email,
        phone: settings.phone,
        whatsappNumber: settings.whatsappNumber,
        location: settings.location,
        address: settings.address,
        workingHours: settings.workingHours,
        websiteUrl: settings.websiteUrl,
        facebookUrl: settings.facebookUrl,
        instagramUrl: settings.instagramUrl,
        youtubeUrl: settings.youtubeUrl,
        linkedinUrl: settings.linkedinUrl,
        twitterUrl: settings.twitterUrl,
        mapUrl: settings.mapUrl,
        mapEmbedUrl: settings.mapEmbedUrl,
        developerCredit: settings.developerCredit,
        developerUrl: settings.developerUrl,
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch settings', error: error.message });
  }
});

// GET /api/settings (Admin)
router.get('/', protectAdmin, async (_req, res) => {
  try {
    let settings = await WebsiteSettings.findOne();
    if (!settings) {
      settings = await WebsiteSettings.create({});
    }
    res.json({ success: true, data: settings });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch settings', error: error.message });
  }
});

// PUT /api/settings (Admin)
router.put('/', protectAdmin, async (req, res) => {
  try {
    let settings = await WebsiteSettings.findOne();
    if (!settings) {
      settings = new WebsiteSettings(req.body);
    } else {
      Object.assign(settings, req.body);
    }
    await settings.save();
    res.json({ success: true, message: 'Website settings updated successfully', data: settings });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to update settings', error: error.message });
  }
});

export default router;
