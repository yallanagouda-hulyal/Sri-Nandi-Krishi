import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Save, CheckCircle2 } from 'lucide-react';
import { settingsService } from '../../services/api';

export default function SettingsManager({ showToast }) {
  const [form, setForm] = useState({
    businessName: 'Sri Nandi Krishi Organic Enterprise',
    tagline: 'Better Farming. Brighter Tomorrow.',
    email: 'srinandikrushi70@gmail.com',
    phone: '+91 79753 05677',
    whatsappNumber: '917975305677',
    location: 'Tadkal road, Aland, Karnataka 585302',
    address: 'Sri Nandi Krishi Organic Enterprises, Tadkal Road, Aland, Karnataka 585302',
    workingHours: 'Mon - Sat: 8:00 AM - 6:00 PM',
    mapUrl: 'https://maps.app.goo.gl/X7TSxQT93axMuCXV6?g_st=ic',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15234.0!2d76.5678524!3d17.5632704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc8ad6fb5ccdc6f%3A0x22c769fe7d935575!2sSri%20Nandi%20Krishi%20organic%20enterprises%20Aland!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
    websiteUrl: 'https://srinandikrishi.com',
    facebookUrl: 'https://www.facebook.com/share/19CwgVuDLW/?mibextid=wwXIfr',
    instagramUrl: 'https://www.instagram.com/sri_nandi_krishi_bio_fertilser?igsh=eHBrcG5jemNhYzF3&utm_source=qr&wa_status_inline=true',
    developerCredit: 'Designed and developed by bookmywebsite.in',
    developerUrl: 'https://bookmywebsite.in'
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await settingsService.getAdmin();
        if (data) setForm(data);
      } catch (err) {
        showToast('Failed to load settings.', 'error');
      } finally {
        setLoading(false);
      }
    };
    loadSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await settingsService.update(form);
      showToast('Website settings updated successfully!', 'success');
    } catch (err) {
      showToast('Failed to save website settings.', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={{ padding: '30px', textAlign: 'center' }}>Loading settings...</div>;

  return (
    <div className="admin-panel-card">
      <div className="admin-panel-header">
        <div>
          <h3>Website & Communication Settings</h3>
          <p>Configure phone numbers, WhatsApp destination, social links, and business metadata</p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="btn btn-primary"
          style={{ padding: '8px 20px', fontSize: '13px' }}
        >
          <Save size={15} />
          <span>{saving ? 'Saving...' : 'Save Settings'}</span>
        </button>
      </div>

      <form onSubmit={handleSave} style={{ display: 'grid', gap: '20px' }}>
        {/* Contact Numbers */}
        <div style={{ borderBottom: '1px solid #e0e6e0', paddingBottom: '20px' }}>
          <h4 style={{ color: '#124B2A', marginBottom: '14px', fontSize: '15px' }}>Communication Channels</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
            <div className="admin-form-group">
              <label className="admin-form-label">WhatsApp Number (Digits only, including country code)</label>
              <input
                type="text"
                name="whatsappNumber"
                value={form.whatsappNumber}
                onChange={handleChange}
                className="admin-form-input"
                placeholder="917975305677"
              />
              <small style={{ color: '#586B60', fontSize: '11px' }}>
                Used for one-click WhatsApp consultation bookings
              </small>
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Business Phone Number</label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="admin-form-input"
                placeholder="+91 79753 05677"
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Official Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="admin-form-input"
                placeholder="srinandikrushi70@gmail.com"
              />
            </div>
          </div>
        </div>

        {/* Business Presence */}
        <div style={{ borderBottom: '1px solid #e0e6e0', paddingBottom: '20px' }}>
          <h4 style={{ color: '#124B2A', marginBottom: '14px', fontSize: '15px' }}>Location & Hours</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
            <div className="admin-form-group">
              <label className="admin-form-label">Location / Town / State</label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                className="admin-form-input"
                placeholder="Tadkal road, Aland, Karnataka 585302"
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Physical Address</label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                className="admin-form-input"
                placeholder="Sri Nandi Krishi Organic Enterprises, Tadkal Road, Aland, Karnataka 585302"
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Working Hours</label>
              <input
                type="text"
                name="workingHours"
                value={form.workingHours}
                onChange={handleChange}
                className="admin-form-input"
                placeholder="Mon - Sat: 8:00 AM - 6:00 PM"
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Google Maps Link (Short or Direct URL)</label>
              <input
                type="text"
                name="mapUrl"
                value={form.mapUrl}
                onChange={handleChange}
                className="admin-form-input"
                placeholder="https://maps.app.goo.gl/..."
              />
              <small style={{ color: '#586B60', fontSize: '11px' }}>
                Opened when visitors click location cards and directions
              </small>
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Google Maps Embed URL (Iframe Src)</label>
              <input
                type="text"
                name="mapEmbedUrl"
                value={form.mapEmbedUrl}
                onChange={handleChange}
                className="admin-form-input"
                placeholder="https://www.google.com/maps/embed?..."
              />
              <small style={{ color: '#586B60', fontSize: '11px' }}>
                Used for the interactive map frame on the contact page
              </small>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div>
          <h4 style={{ color: '#124B2A', marginBottom: '14px', fontSize: '15px' }}>Social Profiles & Footer Credits</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
            <div className="admin-form-group">
              <label className="admin-form-label">Facebook Profile / Page URL</label>
              <input
                type="text"
                name="facebookUrl"
                value={form.facebookUrl}
                onChange={handleChange}
                className="admin-form-input"
                placeholder="https://www.facebook.com/..."
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Instagram Profile URL</label>
              <input
                type="text"
                name="instagramUrl"
                value={form.instagramUrl}
                onChange={handleChange}
                className="admin-form-input"
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Developer Credit Text</label>
              <input
                type="text"
                name="developerCredit"
                value={form.developerCredit}
                onChange={handleChange}
                className="admin-form-input"
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Developer Website URL</label>
              <input
                type="text"
                name="developerUrl"
                value={form.developerUrl}
                onChange={handleChange}
                className="admin-form-input"
              />
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={saving}
            className="btn btn-primary"
            style={{ padding: '12px 28px', fontSize: '14px' }}
          >
            <Save size={16} />
            <span>{saving ? 'Updating...' : 'Save All Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
