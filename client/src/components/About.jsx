import React from 'react';
import { motion } from 'framer-motion';
import {
  Sprout,
  Leaf,
  Users,
  Calendar,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Target,
  Eye,
  Award,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { openWhatsApp } from '../utils/whatsapp';

// Photographic Assets
import aboutFarmer from '../assets/about-farmer-inspecting.jpg';
import sugarcaneCrop from '../assets/sugarcane-crop.jpg';
import bananaCrop from '../assets/banana.jpg';
import papayaCrop from '../assets/papaya.jpg';
import watermelonCrop from '../assets/watermelon.jpg';

export default function About({ settings }) {
  const whatsappNumber = settings?.whatsappNumber && !settings.whatsappNumber.includes('98765') ? settings.whatsappNumber : '917975305677';

  const handleScrollToStory = (e) => {
    e.preventDefault();
    const el = document.getElementById('story-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="about-section-wrapper" id="about">
      {/* 1. Master About Hero Section */}
      <section className="about-hero-section">
        <div className="container">
          <div className="about-hero-grid">
            {/* Left Column: Heading, Subtitle, Description, 4 Cards, CTA */}
            <motion.div
              className="about-hero-content"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
            >
              {/* Sustainable Farming Badge */}
              <div className="about-badge-pill">
                <span className="badge-sprout-circle">
                  <Sprout size={14} />
                </span>
                <span>Sustainable Farming for a Better Tomorrow</span>
              </div>

              {/* Main Heading & Gold Italic Subtitle */}
              <h2 className="about-main-title">About Us</h2>
              <h3 className="about-main-subtitle">Growing Better Farms, Together</h3>

              {/* Descriptive Paragraph */}
              <p className="about-main-description">
                Sri Nandi Krishi Organic Enterprise is committed to helping farmers with practical knowledge,
                modern farming techniques and organic solutions. We provide expert guidance for
                sugarcane, banana, papaya and watermelon cultivation to ensure better yield and
                healthy crops.
              </p>

              {/* 4 Premium Glass Feature Cards (2x2 Grid) */}
              <div className="about-features-2x2-grid">
                {/* Card 1: Practical Guidance */}
                <div
                  className="about-glass-card"
                  onClick={() => openWhatsApp('Sugarcane', 'Hello Sri Nandi Krishi, I want to learn more about your Practical Guidance.', whatsappNumber)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="about-card-icon green">
                    <Sprout size={20} />
                  </div>
                  <div className="about-card-text">
                    <h4 className="about-card-heading">Practical Guidance</h4>
                    <p className="about-card-body">
                      Field-tested advice tailored to actual crop stages and soil conditions.
                    </p>
                  </div>
                  <div className="about-card-arrow">
                    <ArrowRight size={14} />
                  </div>
                </div>

                {/* Card 2: Crop Specific Support */}
                <div
                  className="about-glass-card"
                  onClick={() => openWhatsApp('Banana', 'Hello Sri Nandi Krishi, I want to learn more about Crop Specific Support.', whatsappNumber)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="about-card-icon green">
                    <Leaf size={20} />
                  </div>
                  <div className="about-card-text">
                    <h4 className="about-card-heading">Crop Specific Support</h4>
                    <p className="about-card-body">
                      Dedicated protocols for Sugarcane, Banana, Papaya, and Watermelon.
                    </p>
                  </div>
                  <div className="about-card-arrow">
                    <ArrowRight size={14} />
                  </div>
                </div>

                {/* Card 3: Farmer Friendly */}
                <div
                  className="about-glass-card"
                  onClick={() => openWhatsApp('Papaya', 'Hello Sri Nandi Krishi, I would like direct farmer guidance.', whatsappNumber)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="about-card-icon green">
                    <Users size={20} />
                  </div>
                  <div className="about-card-text">
                    <h4 className="about-card-heading">Farmer Friendly</h4>
                    <p className="about-card-body">
                      Direct communication in simple language via WhatsApp and call.
                    </p>
                  </div>
                  <div className="about-card-arrow">
                    <ArrowRight size={14} />
                  </div>
                </div>

                {/* Card 4: Cultivation Planning */}
                <div
                  className="about-glass-card"
                  onClick={() => openWhatsApp('Watermelon', 'Hello Sri Nandi Krishi, I want seasonal cultivation planning guidance.', whatsappNumber)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="about-card-icon green">
                    <Calendar size={20} />
                  </div>
                  <div className="about-card-text">
                    <h4 className="about-card-heading">Cultivation Planning</h4>
                    <p className="about-card-body">
                      Complete seasonal schedules from land prep to harvest timing.
                    </p>
                  </div>
                  <div className="about-card-arrow">
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>

              {/* Main CTA Button: Scroll to Story & Guidance */}
              <div className="about-actions-wrap">
                <button
                  className="btn-about-story"
                  onClick={handleScrollToStory}
                  title="Explore Our Story & Guidance"
                >
                  <BookOpen size={18} />
                  <span>Our Story & Guidance</span>
                  <ArrowRight size={17} />
                </button>
              </div>
            </motion.div>

            {/* Right Column: Master Agricultural Photographic Composition */}
            <motion.div
              className="about-hero-visual"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <div className="about-photo-master-composition">
                {/* Main Photograph: Farmer Inspecting Plants in Golden Sunlight */}
                <div className="about-farmer-photo-frame">
                  <img
                    src={aboutFarmer}
                    alt="Indian farmer inspecting healthy green crops in sunlit organic farmland"
                    className="about-farmer-inspecting-img"
                  />
                  <div className="about-photo-ambient-sunlight"></div>
                </div>

                {/* Top-Right Circular Badge Overlay: Healthy Crops, Happier Farmers */}
                <div className="about-healthy-crops-badge" aria-hidden="true">
                  <div className="badge-inner-glow">
                    <Sprout size={16} className="badge-gold-sprout" />
                    <span className="badge-script-line line-1">Healthy</span>
                    <span className="badge-script-line line-2">Crops</span>
                    <span className="badge-script-line line-3">Happier</span>
                    <span className="badge-script-line line-4">Farmers</span>
                  </div>
                </div>

                {/* Bottom-Right Curved 4-Crop Collage Cluster */}
                <div className="about-crops-quad-cluster" aria-hidden="true">
                  {/* 1. Sugarcane segment */}
                  <div className="crop-quad-slice slice-sugarcane" title="Sugarcane Cultivation">
                    <img src={sugarcaneCrop} alt="Sugarcane" />
                  </div>
                  {/* 2. Banana segment */}
                  <div className="crop-quad-slice slice-banana" title="Banana Cultivation">
                    <img src={bananaCrop} alt="Banana" />
                  </div>
                  {/* 3. Papaya segment */}
                  <div className="crop-quad-slice slice-papaya" title="Papaya Cultivation">
                    <img src={papayaCrop} alt="Papaya" />
                  </div>
                  {/* 4. Watermelon segment */}
                  <div className="crop-quad-slice slice-watermelon" title="Watermelon Cultivation">
                    <img src={watermelonCrop} alt="Watermelon" />
                  </div>
                </div>

                {/* Floating Breeze Leaf Accent with Frame Motion */}
                <motion.div
                  className="about-floating-accent-leaf leaf-left"
                  animate={{ y: [0, -10, 0], rotate: [0, 8, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 40 30" width="36" height="26" fill="none">
                    <path d="M 4 15 Q 20 0 36 10 Q 24 28 4 15 Z" fill="#2E7D32" />
                    <path d="M 4 15 Q 20 10 32 11" stroke="#86EFAC" strokeWidth="1.5" />
                  </svg>
                </motion.div>

                <motion.div
                  className="about-floating-accent-leaf leaf-bottom"
                  animate={{ y: [0, 8, 0], rotate: [0, -6, 0] }}
                  transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut' }}
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 40 30" width="42" height="30" fill="none">
                    <path d="M 4 15 Q 20 0 36 10 Q 24 28 4 15 Z" fill="#15803D" />
                    <path d="M 4 15 Q 20 10 32 11" stroke="#A7F3D0" strokeWidth="1.5" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Story, Mission, Vision & Guidance Section */}
      <section className="about-story-section" id="story-section">
        <div className="container">
          <motion.div
            className="section-title-wrap text-center"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-eyebrow">
              <Sparkles size={15} /> Practical Agronomic Heritage
            </span>
            <h2 className="section-heading">
              Our Mission <span className="title-amp">&amp;</span> <span className="gold-text">Farming Vision</span>
            </h2>
            <div className="section-title-divider" aria-hidden="true">
              <span className="divider-line" />
              <span className="divider-leaf">🌱</span>
              <span className="divider-line right" />
            </div>
            <p className="section-subheading">
              Ground-level expertise focused on sustainable yields, low-cost bio-inputs, and resilient soil health.
            </p>
          </motion.div>

          <div className="about-story-cards-grid">
            {/* Mission Card */}
            <div className="story-glass-card">
              <div className="story-card-top">
                <div className="story-icon-box green">
                  <Target size={24} />
                </div>
                <div>
                  <h3 className="story-card-title">Our Mission</h3>
                  <span className="story-card-tag">Science-Backed Field Guidance</span>
                </div>
              </div>
              <p className="story-card-desc">
                To empower agricultural communities with science-backed, field-tested organic cultivation protocols that lower input costs, maximize harvest tonnage, and regenerate soil vitality for future generations.
              </p>
              <ul className="story-card-checklist">
                <li><CheckCircle2 size={16} /> Stage-wise organic nutrition scheduling</li>
                <li><CheckCircle2 size={16} /> Eco-safe pest and fungal suppression</li>
                <li><CheckCircle2 size={16} /> Water-efficient drip fertigation support</li>
              </ul>
            </div>

            {/* Vision Card */}
            <div className="story-glass-card">
              <div className="story-card-top">
                <div className="story-icon-box green">
                  <Eye size={24} />
                </div>
                <div>
                  <h3 className="story-card-title">Our Vision</h3>
                  <span className="story-card-tag">Trusted Grower Partnership</span>
                </div>
              </div>
              <p className="story-card-desc">
                To be India's most trusted agricultural consultancy partner for Sugarcane, Banana, Papaya, and Watermelon growers, setting the standard for profitable, sustainable farming without guesswork.
              </p>
              <ul className="story-card-checklist">
                <li><CheckCircle2 size={16} /> Consistent high-Brix and heavy-weight harvests</li>
                <li><CheckCircle2 size={16} /> Honest, verified guidance tailored to regional conditions</li>
                <li><CheckCircle2 size={16} /> Direct consultation on WhatsApp and phone</li>
              </ul>
            </div>
          </div>

          {/* Direct Consultation Banner */}
          <div className="about-cta-banner">
            <div className="cta-banner-content">
              <div className="cta-badge">
                <Award size={16} /> Dedicated Agronomic Consultancy
              </div>
              <h3>Have Questions About Your Crop Growth?</h3>
              <p>
                Connect directly with our agronomists on WhatsApp for variety selection, nutrient schedules, and pest diagnosis.
              </p>
            </div>
            <button
              className="btn-banner-wa"
              onClick={() => openWhatsApp('', 'Hello Sri Nandi Krishi, I would like direct agronomy guidance for my farm.', whatsappNumber)}
              title="Chat on WhatsApp"
            >
              <span>Connect on WhatsApp</span>
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
