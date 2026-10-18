import React from 'react';
import { motion } from 'framer-motion';
import {
  Sprout,
  ArrowRight,
  Leaf,
  TrendingUp,
  MessageSquareText
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import heroFarmer from '../assets/hero-farmer.jpg';
import heroLeavesTop from '../assets/hero-leaves-top.png';
import { openWhatsApp } from '../utils/whatsapp';
import CurvedWaveStats from './CurvedWaveStats';

export default function Hero({ settings }) {
  const whatsappNumber = settings?.whatsappNumber || '919876543210';

  const handleBook = () => {
    openWhatsApp('', '', whatsappNumber);
  };

  const handleOpenChat = () => {
    window.dispatchEvent(new CustomEvent('open-krishi-chat'));
  };

  const scrollToServices = (e) => {
    e.preventDefault();
    const el = document.getElementById('services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section" id="home">
      {/* Photorealistic Dewy Foliage Overlay (Top Left) */}
      <div className="hero-photorealistic-foliage" aria-hidden="true">
        <img
          src={heroLeavesTop}
          alt=""
          className="hero-foliage-leaf-img"
        />
      </div>

      {/* Floating Breeze Leaf */}
      <motion.div
        className="hero-floating-dew-leaf"
        aria-hidden="true"
        animate={{ y: [0, -12, 0], rotate: [0, 6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg viewBox="0 0 60 40" width="50" height="34" fill="none">
          <path
            d="M 5 20 Q 30 0 55 15 Q 35 38 5 20 Z"
            fill="url(#dewLeafGrad)"
          />
          <path d="M 5 20 Q 30 15 50 16" stroke="#A3E635" strokeWidth="1.5" />
          <defs>
            <linearGradient id="dewLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2E7D32" />
              <stop offset="100%" stopColor="#84CC16" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Right-Side Farmer Visual Container with Soft Sunlit Left Blend */}
      <div className="hero-farmer-visual-wrap" aria-hidden="true">
        <img
          src={heroFarmer}
          alt="Cheerful Indian farmer holding fresh sugarcane in organic farmland"
          className="hero-farmer-visual-img"
        />
        {/* Soft Left Edge Fade into warm ivory */}
        <div className="hero-farmer-edge-blend"></div>
      </div>

      {/* Warm Golden Sunburst Glow in Mid-Upper Hero */}
      <div className="hero-golden-lens-flare" aria-hidden="true"></div>

      {/* Foreground Content Container */}
      <div className="container hero-content-container">
        <div className="hero-grid">
          {/* Left Text & Glass Feature Cards */}
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            {/* Small Gold & Green Pill Badge */}
            <div className="hero-sustainable-badge">
              <span className="badge-leaf-circle">
                <Sprout size={14} />
              </span>
              <span>Sustainable Farming for a Better Tomorrow</span>
            </div>

            {/* Main Title: Better Farming / Brighter Tomorrow */}
            <h1 className="hero-title">
              <span className="dark-text">
                Better Farming
                <span className="hero-title-leaf-icon" aria-hidden="true">
                  <svg viewBox="0 0 32 32" width="28" height="28" fill="none">
                    <path d="M6 26C12 26 26 20 26 6C16 6 6 16 6 26Z" fill="#15803D" />
                    <path d="M6 26C14 20 20 14 26 6" stroke="#86EFAC" strokeWidth="2.2" strokeLinecap="round" />
                  </svg>
                </span>
              </span>
              <span className="gold-text">Brighter Tomorrow</span>
            </h1>

            {/* Description Subtitle */}
            <p className="hero-subtitle">
              Expert guidance for Sugarcane, Banana, Papaya and Watermelon
              cultivation with modern and organic farming methods.
            </p>

            {/* 3 Ultra-Glassy Feature Cards */}
            <div className="hero-feature-cards-row">
              <div className="hero-feat-card">
                <div className="feat-card-icon green">
                  <Leaf size={18} />
                </div>
                <div className="feat-card-text">
                  <span className="feat-title">Expert</span>
                  <span className="feat-sub">Consultation</span>
                </div>
              </div>

              <div className="hero-feat-card">
                <div className="feat-card-icon gold">
                  <Sprout size={18} />
                </div>
                <div className="feat-card-text">
                  <span className="feat-title">Organic</span>
                  <span className="feat-sub">Farming Solutions</span>
                </div>
              </div>

              <div className="hero-feat-card">
                <div className="feat-card-icon green">
                  <TrendingUp size={18} />
                </div>
                <div className="feat-card-text">
                  <span className="feat-title">Better</span>
                  <span className="feat-sub">Crop Management</span>
                </div>
              </div>
            </div>

            {/* Two Action Buttons */}
            <div className="hero-actions">
              <button
                className="btn-hero-book"
                onClick={handleBook}
                title="Book Consultation directly on WhatsApp"
              >
                <span className="btn-wa-circle">
                  <FaWhatsapp size={16} />
                </span>
                <span>Book Consultation</span>
                <ArrowRight size={17} />
              </button>

              <a
                href="#services"
                onClick={scrollToServices}
                className="btn-hero-explore"
              >
                <span>Explore Our Services</span>
                <ArrowRight size={17} />
              </a>
            </div>
          </motion.div>

          {/* Right Column Spacer (balancing farmer who stands on the right) */}
          <div className="hero-farmer-spacer" aria-hidden="true"></div>
        </div>
      </div>

      {/* Full-Width Curved Golden Wave Bottom Ribbon with Modern Designer Stats */}
      <CurvedWaveStats />
    </section>
  );
}
