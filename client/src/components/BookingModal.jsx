import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageCircle, CheckCircle2, AlertCircle } from 'lucide-react';
import { bookingService } from '../services/api';
import { openWhatsApp } from '../utils/whatsapp';

export default function BookingModal({ isOpen, onClose, defaultCrop = 'Sugarcane', whatsappNumber }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    crop: defaultCrop || 'Sugarcane',
    area: '',
    preferredDate: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', text: '' });
  const [successBooking, setSuccessBooking] = useState(null);

  useEffect(() => {
    if (defaultCrop) {
      setFormData((prev) => ({ ...prev, crop: defaultCrop }));
    }
  }, [defaultCrop]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', text: '' });
    setLoading(true);

    if (!formData.name.trim() || !formData.phone.trim()) {
      setStatus({ type: 'error', text: 'Name and phone number are required.' });
      setLoading(false);
      return;
    }

    try {
      await bookingService.create(formData);
      setStatus({
        type: 'success',
        text: 'Consultation request submitted successfully!'
      });
      setSuccessBooking({ ...formData });
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to submit request. Please try WhatsApp directly.';
      setStatus({ type: 'error', text: msg });
    } finally {
      setLoading(false);
    }
  };

  const handleContinueWhatsApp = () => {
    const crop = successBooking?.crop || formData.crop;
    const customMsg = `Hello Sri Nandi Krishi Organic Enterprise, I requested a consultation:%0AName: ${successBooking?.name || formData.name}%0APhone: ${successBooking?.phone || formData.phone}%0ACrop: ${crop}%0AArea: ${successBooking?.area || formData.area || 'Karnataka'}%0ANote: ${successBooking?.message || formData.message || 'Please guide me.'}`;
    openWhatsApp(crop, customMsg, whatsappNumber);
    onClose();
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <motion.div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.2 }}
      >
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '26px', color: '#124B2A', marginBottom: '6px' }}>
          Book Crop Consultation
        </h3>
        <p style={{ fontSize: '13px', color: '#586B60', marginBottom: '22px' }}>
          Share your farm requirements. We'll connect with you to discuss crop-stage guidance.
        </p>

        {status.type === 'success' ? (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <CheckCircle2 size={46} color="#124B2A" style={{ margin: '0 auto 12px' }} />
            <h4 style={{ fontSize: '18px', color: '#124B2A', marginBottom: '8px' }}>
              Request Received!
            </h4>
            <p style={{ fontSize: '13px', color: '#586B60', marginBottom: '20px' }}>
              We have recorded your details in our system. You can also chat directly on WhatsApp to get faster answers.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                className="btn btn-primary"
                style={{ background: '#25D366', color: '#ffffff', border: 'none' }}
                onClick={handleContinueWhatsApp}
              >
                <MessageCircle size={16} />
                <span>Continue on WhatsApp</span>
              </button>

              <button
                className="btn btn-outline"
                onClick={onClose}
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '14px' }}>
            <div>
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                name="name"
                required
                placeholder="Enter your name"
                className="form-input"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label className="form-label">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="Contact number"
                  className="form-input"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="form-label">Crop Category *</label>
                <select
                  name="crop"
                  className="form-select"
                  value={formData.crop}
                  onChange={handleChange}
                >
                  <option value="Sugarcane">Sugarcane</option>
                  <option value="Banana">Banana</option>
                  <option value="Papaya">Papaya</option>
                  <option value="Watermelon">Watermelon</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="form-label">Village / Farm Location (Optional)</label>
              <input
                type="text"
                name="area"
                placeholder="Where is your farm located?"
                className="form-input"
                value={formData.area}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="form-label">Query / Crop Condition</label>
              <textarea
                name="message"
                rows="3"
                placeholder="Briefly describe your crop stage, fertilizer concern, or guidance needed..."
                className="form-textarea"
                value={formData.message}
                onChange={handleChange}
              />
            </div>

            {status.text && (
              <div className={`form-feedback ${status.type}`}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {status.type === 'error' && <AlertCircle size={16} />}
                  <span>{status.text}</span>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ marginTop: '6px', width: '100%', padding: '13px' }}
            >
              {loading ? 'Submitting...' : 'Confirm & Request Consultation'}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
