import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Send,
  User,
  Sprout,
  MessageSquare,
  MessageSquareText,
  ChevronRight,
  Leaf,
  CheckCircle2,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import farmerTablet from '../assets/farmer-tablet.jpg';
import { bookingService } from '../services/api';
import { openWhatsApp } from '../utils/whatsapp';

export default function Contact({ settings }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    crop: 'Sugarcane',
    email: '',
    subject: 'General Farming Guidance',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', text: '' });

  const phone = settings?.phone && !settings.phone.includes('98765') ? settings.phone : '+91 79753 05677';
  const email = settings?.email || 'srinandikrushi70@gmail.com';
  const whatsappNumber = settings?.whatsappNumber && !settings.whatsappNumber.includes('98765') ? settings.whatsappNumber : '917975305677';
  const mapUrl = settings?.mapUrl || 'https://maps.app.goo.gl/X7TSxQT93axMuCXV6?g_st=ic';

  // Exact street-level pin for Sri Nandi Krishi Organic Enterprises in Aland
  const EXACT_ALAND_MAP_EMBED = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3800.5!2d76.5699156!3d17.5703105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc8ad6fb5ccdc6f%3A0x22c769fe7d935575!2sSri%20Nandi%20Krishi%20organic%20enterprises%20Aland!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin';
  const mapEmbedUrl = (settings?.mapEmbedUrl && !settings.mapEmbedUrl.includes('Karnataka!5e0') && !settings.mapEmbedUrl.includes('1d3847926'))
    ? settings.mapEmbedUrl
    : EXACT_ALAND_MAP_EMBED;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', text: '' });

    if (!formData.name.trim() || !formData.phone.trim()) {
      setStatus({ type: 'error', text: 'Please enter your name and phone number.' });
      setLoading(false);
      return;
    }

    try {
      // 1. Save consultation request to backend MongoDB
      await bookingService.create(formData);

      // 2. Open WhatsApp with prefilled details
      const waText = `Hello Sri Nandi Krishi Organic Enterprise, I submitted an agricultural consultation request:%0AName: ${formData.name}%0APhone: ${formData.phone}%0ACrop: ${formData.crop}%0ASubject: ${formData.subject}%0AMessage: ${formData.message || 'Please provide crop guidance.'}`;
      openWhatsApp(formData.crop, waText, whatsappNumber);

      setStatus({
        type: 'success',
        text: 'Consultation request submitted! Connecting you to WhatsApp...'
      });

      setFormData({
        name: '',
        phone: '',
        crop: 'Sugarcane',
        email: '',
        subject: 'General Farming Guidance',
        message: ''
      });
    } catch (err) {
      // Fallback: still open WhatsApp so farmer is never blocked
      const waText = `Hello Sri Nandi Krishi Organic Enterprise, I submitted a consultation request for ${formData.crop} farming. Name: ${formData.name}, Phone: ${formData.phone}`;
      openWhatsApp(formData.crop, waText, whatsappNumber);
      setStatus({
        type: 'success',
        text: 'Redirecting to WhatsApp for direct consultation...'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-section" id="contact">
      {/* Soft ambient background */}
      <div className="contact-bg-ambient" aria-hidden="true" />

      <div className="container">
        {/* Section Header matching reference image */}
        <div className="contact-header-wrap">
          <div className="contact-ornament-leaf" aria-hidden="true">
            <span className="ornament-line" />
            <Leaf size={16} className="ornament-leaf-icon" />
            <span className="ornament-line right" />
          </div>
          <h2 className="contact-main-title">
            Contact <span className="gold-text">Us</span>
          </h2>
          <p className="contact-sub-title">
            Get in Touch for Expert Farming Guidance
          </p>
          <div className="contact-title-accent-bar" aria-hidden="true" />
        </div>

        {/* 2-Column Grid Layout */}
        <div className="contact-grid-layout">
          {/* Left Column: Banner Card + 3 Info Cards */}
          <motion.div
            className="contact-left-col"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Banner Card: Farmer Photo with Green Text Overlay */}
            <div className="contact-banner-card">
              <img
                src={farmerTablet}
                alt="Agricultural specialist available for farmer consultations"
                className="banner-bg-img"
              />
              <div className="banner-green-overlay">
                <span className="banner-kicker">
                  <span className="kicker-dash">—</span> We Are Here For You
                </span>
                <h3 className="banner-title">
                  Farming <br />
                  Solutions <br />
                  <span className="banner-script-italic">Made Simple</span>
                </h3>
                <p className="banner-desc">
                  Connect with our experts for personalized guidance and better crop growth.
                </p>
              </div>
            </div>

            {/* 4 Horizontal Contact Cards */}
            <div className="contact-cards-stack">
              {/* WhatsApp Card */}
              <a
                href={`https://wa.me/917975305677?text=${encodeURIComponent('Hello Sri Nandi Krishi Organic Enterprise, I would like to consult regarding agricultural crop guidance.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-ref-card"
                title="Chat on WhatsApp (+91 79753 05677)"
                style={{ borderLeft: '4px solid #25D366' }}
              >
                <div className="contact-ref-card-left">
                  <div className="ref-icon-bubble" style={{ background: '#25D366', color: '#fff' }}>
                    <FaWhatsapp size={20} />
                  </div>
                  <div className="ref-text-col">
                    <span className="ref-label" style={{ color: '#128C7E', fontWeight: 700 }}>WHATSAPP CONSULTATION</span>
                    <b className="ref-value" style={{ color: '#0f5132' }}>+91 79753 05677</b>
                    <small className="ref-hint">Instant 24/7 crop guidance & order advice</small>
                  </div>
                </div>
                <div className="ref-arrow-circle" aria-hidden="true" style={{ background: '#25D366', color: '#fff' }}>
                  <ChevronRight size={18} />
                </div>
              </a>

              {/* Phone Card */}
              <a
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="contact-ref-card"
                title="Call us directly (+91 79753 05677)"
                style={{ borderLeft: '4px solid #D6A62E' }}
              >
                <div className="contact-ref-card-left">
                  <div className="ref-icon-bubble" style={{ background: '#D6A62E', color: '#fff' }}>
                    <Phone size={20} />
                  </div>
                  <div className="ref-text-col">
                    <span className="ref-label">DIRECT CALL</span>
                    <b className="ref-value">{phone}</b>
                    <small className="ref-hint">Call us directly for immediate support</small>
                  </div>
                </div>
                <div className="ref-arrow-circle" aria-hidden="true">
                  <ChevronRight size={18} />
                </div>
              </a>

              {/* Location Card */}
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-ref-card"
                title="View Sri Nandi Krishi Organic Enterprises on Google Maps"
                style={{ borderLeft: '4px solid #124B2A' }}
              >
                <div className="contact-ref-card-left">
                  <div className="ref-icon-bubble" style={{ background: '#124B2A', color: '#fff' }}>
                    <MapPin size={20} />
                  </div>
                  <div className="ref-text-col">
                    <span className="ref-label">ENTERPRISE LOCATION</span>
                    <b className="ref-value">Tadkal Road, Aland</b>
                    <small className="ref-hint">Kalaburagi, Karnataka 585302 (Open in Google Maps)</small>
                  </div>
                </div>
                <div className="ref-arrow-circle" aria-hidden="true">
                  <ChevronRight size={18} />
                </div>
              </a>

              {/* Email Card */}
              <a
                href={`mailto:${email}`}
                className="contact-ref-card"
                title="Send us an email"
              >
                <div className="contact-ref-card-left">
                  <div className="ref-icon-bubble">
                    <Mail size={20} />
                  </div>
                  <div className="ref-text-col">
                    <span className="ref-label">EMAIL</span>
                    <b className="ref-value">{email}</b>
                    <small className="ref-hint">Drop us an email, we'll respond soon</small>
                  </div>
                </div>
                <div className="ref-arrow-circle" aria-hidden="true">
                  <ChevronRight size={18} />
                </div>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Form Box Card Matching Reference Image */}
          <motion.div
            className="contact-right-form-col"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="contact-box-form-wrapper">
              <div className="contact-box-form-inner">
                {/* Form Top Green Header Banner */}
                <div className="contact-form-banner-top">
                  <div className="form-banner-left">
                    <Send size={24} className="form-banner-plane-icon" />
                    <div>
                      <h3 className="form-banner-title">Send Us a Message</h3>
                      <p className="form-banner-sub">
                        We'll get back to you with the best farming guidance.
                      </p>
                    </div>
                  </div>
                  {/* Subtle Leaf Watermark on Right */}
                  <div className="form-banner-leaf-watermark" aria-hidden="true">
                    <svg viewBox="0 0 100 80" width="76" height="60" fill="none">
                      <path d="M 10 70 Q 55 5 85 15 Q 85 55 10 70 Z" fill="rgba(255,255,255,0.08)" />
                      <path d="M 25 55 Q 60 25 85 15" stroke="rgba(255,255,255,0.14)" strokeWidth="2" />
                    </svg>
                  </div>
                </div>

                {/* Form Inputs Body */}
                <form onSubmit={handleSubmit} className="contact-form-body">
                  {/* Row 1: Name & Phone */}
                  <div className="form-inputs-2col">
                    <div className="form-input-group">
                      <User size={18} className="input-lead-icon" />
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Your Name"
                        className="lead-field-input"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-input-group">
                      <Phone size={18} className="input-lead-icon" />
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="Phone Number"
                        className="lead-field-input"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Row 2: Select Crop & Email */}
                  <div className="form-inputs-2col">
                    <div className="form-input-group">
                      <Sprout size={18} className="input-lead-icon" />
                      <select
                        name="crop"
                        className="lead-field-select"
                        value={formData.crop}
                        onChange={handleChange}
                      >
                        <option value="Sugarcane">Select Crop: Sugarcane</option>
                        <option value="Banana">Select Crop: Banana</option>
                        <option value="Papaya">Select Crop: Papaya</option>
                        <option value="Watermelon">Select Crop: Watermelon</option>
                        <option value="Horticulture">Select Crop: Horticulture</option>
                        <option value="Other">Select Crop: Other Crop</option>
                      </select>
                    </div>

                    <div className="form-input-group">
                      <Mail size={18} className="input-lead-icon" />
                      <input
                        type="email"
                        name="email"
                        placeholder="Your Email (Optional)"
                        className="lead-field-input"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Row 3: Subject / Purpose Dropdown */}
                  <div className="form-input-group">
                    <MessageSquare size={18} className="input-lead-icon" />
                    <select
                      name="subject"
                      className="lead-field-select"
                      value={formData.subject}
                      onChange={handleChange}
                    >
                      <option value="General Farming Guidance">General Farming Guidance</option>
                      <option value="Crop Nutrition & Scheduling">Crop Nutrition & Scheduling</option>
                      <option value="Pest & Fungal Disease Diagnostic">Pest & Fungal Disease Diagnostic</option>
                      <option value="Organic Bio-Inputs & Fertilizer Advice">Organic Bio-Inputs & Fertilizer Advice</option>
                      <option value="Drip Fertigation & Irrigation Protocol">Drip Fertigation & Irrigation Protocol</option>
                      <option value="Harvest & High-Brix Quality Support">Harvest & High-Brix Quality Support</option>
                    </select>
                  </div>

                  {/* Row 4: Message Textarea */}
                  <div className="form-input-group">
                    <MessageSquareText size={18} className="textarea-lead-icon" />
                    <textarea
                      name="message"
                      rows="4"
                      placeholder="Your Message (Crop stage, soil type, or agricultural concern)..."
                      className="lead-field-textarea"
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-form-submit-wide"
                  >
                    <Send size={18} className="btn-send-icon" />
                    <span>{loading ? 'Submitting & Opening WhatsApp...' : 'Send Message'}</span>
                    <div className="btn-leaf-watermark" aria-hidden="true">
                      <svg viewBox="0 0 50 35" width="40" height="28" fill="none">
                        <path d="M 5 30 Q 30 5 45 10 Q 45 30 5 30 Z" fill="rgba(255,255,255,0.08)" />
                      </svg>
                    </div>
                  </button>

                  {/* Status alert message */}
                  {status.text && (
                    <div className={`form-status-alert ${status.type}`}>
                      {status.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                      <span>{status.text}</span>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Interactive Google Map Section */}
        <motion.div
          className="contact-map-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            marginTop: '45px',
            background: '#ffffff',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
            border: '1px solid #E1E8E3'
          }}
        >
          <div
            style={{
              padding: '18px 24px',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '12px',
              borderBottom: '1px solid #EAEFEA',
              background: '#F9FAF9'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={20} color="#124B2A" />
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#124B2A' }}>
                  Sri Nandi Krishi Organic Enterprises
                </h3>
              </div>
              <p style={{ margin: '4px 0 0 28px', fontSize: '13px', color: '#586B60' }}>
                Tadkal Road, Aland, Kalaburagi, Karnataka 585302
              </p>
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <a
                href={`https://wa.me/917975305677?text=${encodeURIComponent('Hello Sri Nandi Krishi Organic Enterprise, I would like to consult or visit your Aland enterprise.')}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 18px',
                  background: '#25D366',
                  color: '#ffffff',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <FaWhatsapp size={16} />
                <span>WhatsApp: 7975305677</span>
              </a>

              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 18px',
                  background: '#124B2A',
                  color: '#ffffff',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <span>Get Directions on Google Maps</span>
                <ExternalLink size={15} />
              </a>
            </div>
          </div>

          <div style={{ width: '100%', height: '400px', position: 'relative' }}>
            <iframe
              title="Sri Nandi Krishi Organic Enterprises Location Map"
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
