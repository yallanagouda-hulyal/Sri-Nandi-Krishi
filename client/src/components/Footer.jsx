import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp
} from 'react-icons/fa';
import logo from '../assets/sri-nandi-logo.png';
import { openWhatsApp } from '../utils/whatsapp';

export default function Footer({ settings }) {
  const currentYear = new Date().getFullYear();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const phone = settings?.phone && !settings.phone.includes('98765') ? settings.phone : '+91 79753 05677';
  const email = settings?.email || 'srinandikrushi70@gmail.com';
  const whatsappNumber = settings?.whatsappNumber && !settings.whatsappNumber.includes('98765') ? settings.whatsappNumber : '917975305677';
  const facebookUrl = settings?.facebookUrl || 'https://www.facebook.com/share/19CwgVuDLW/?mibextid=wwXIfr';
  const instagramUrl = settings?.instagramUrl || 'https://www.instagram.com/sri_nandi_krishi_bio_fertilser?igsh=eHBrcG5jemNhYzF3&utm_source=qr&wa_status_inline=true';

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="reference-footer">
      <div className="container">
        <div className="footer-columns-grid">
          {/* Brand Info */}
          <div className="footer-brand-column">
            <div className="footer-brand-header">
              <img
                src={logo}
                alt="Sri Nandi Krishi Organic Enterprise"
                className="footer-brand-logo"
              />
              <div className="footer-brand-names">
                <span className="footer-brand-title">SRI NANDI KRISHI</span>
                <span className="footer-brand-subtitle">ORGANIC ENTERPRISE</span>
              </div>
            </div>

            <p className="footer-brand-paragraph">
              We provide expert farming guidance for sugarcane, banana, papaya and watermelon with modern and organic methods to ensure better yield and healthy crops.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-links-column">
            <h4 className="footer-column-heading">Quick Links</h4>
            <ul className="footer-column-list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/testimonials">Testimonials</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Our Services */}
          <div className="footer-links-column">
            <h4 className="footer-column-heading">Our Services</h4>
            <ul className="footer-column-list">
              <li><Link to="/services/sugarcane">Sugarcane Farming</Link></li>
              <li><Link to="/services/banana">Banana Farming</Link></li>
              <li><Link to="/services/papaya">Papaya Farming</Link></li>
              <li><Link to="/services/watermelon">Watermelon Farming</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-contact-column">
            <h4 className="footer-column-heading">Contact Info</h4>
            <div className="footer-contact-line">
              <Phone size={14} color="#D6A62E" />
              <a href={`tel:${phone.replace(/\s+/g, '')}`}>{phone}</a>
            </div>
            <div className="footer-contact-line">
              <Mail size={14} color="#D6A62E" />
              <a href={`mailto:${email}`}>{email}</a>
            </div>
            <div className="footer-contact-line">
              <span style={{ color: '#D6A62E', fontSize: '13px' }}>🌐</span>
              <a href="https://srinandikrishi.com" target="_blank" rel="noreferrer">www.srinandikrishi.com</a>
            </div>
            <div className="footer-contact-line">
              <MapPin size={14} color="#D6A62E" />
              <a
                href={settings?.mapUrl || "https://maps.app.goo.gl/X7TSxQT93axMuCXV6?g_st=ic"}
                target="_blank"
                rel="noreferrer"
                style={{ color: 'inherit', textDecoration: 'none' }}
                title="View location on Google Maps"
              >
                {(settings?.location && settings.location !== 'Karnataka, India')
                  ? settings.location
                  : 'Tadkal road, Aland, Karnataka 585302'}
              </a>
            </div>
          </div>
        </div>

        {/* Follow Us & Subscribe Row matching reference */}
        <div className="footer-bottom-utility-row">
          <div className="footer-socials-block">
            <span className="utility-label">Follow Us</span>
            <div className="footer-colored-socials">
              <a
                href={facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="social-colored-circle fb"
                aria-label="Facebook"
              >
                <FaFacebookF size={14} />
              </a>

              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="social-colored-circle insta"
                aria-label="Instagram"
              >
                <FaInstagram size={15} />
              </a>

              <button
                onClick={() => openWhatsApp('', '', whatsappNumber)}
                className="social-colored-circle wa"
                aria-label="WhatsApp"
                title="Chat on WhatsApp"
              >
                <FaWhatsapp size={15} />
              </button>
            </div>
          </div>

          <div className="footer-subscribe-block">
            <span className="utility-label">Subscribe for Updates</span>
            <form onSubmit={handleSubscribe} className="footer-subscribe-form">
              <input
                type="email"
                placeholder={subscribed ? "Thank you for subscribing!" : "Enter your email address"}
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="footer-sub-input"
                disabled={subscribed}
                required
              />
              <button
                type="submit"
                className="footer-sub-btn"
                aria-label="Subscribe"
                disabled={subscribed}
              >
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Exact Developer Credit */}
        <div className="footer-copyright-bar">
          <div>
            © 2024 Sri Nandi Krishi Organic Enterprise. All rights reserved.
          </div>

          <div>
            Designed and developed by{' '}
            <a
              href="https://bookmywebsite.in"
              target="_blank"
              rel="noreferrer"
            >
              bookmywebsite.in
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
