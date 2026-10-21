import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ArrowRight, ChevronRight, MessageCircle, Sprout } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingActions from '../components/FloatingActions';
import { cropService, settingsService, DEFAULT_SETTINGS } from '../services/api';
import { openWhatsApp } from '../utils/whatsapp';

import sugarcaneImg from '../assets/sugarcane-crop.jpg';
import bananaImg from '../assets/banana.jpg';
import papayaImg from '../assets/papaya.jpg';
import watermelonImg from '../assets/watermelon.jpg';

export const CROP_SERVICES = [
  {
    slug: 'sugarcane',
    name: 'Sugarcane Farming',
    cropName: 'Sugarcane',
    image: sugarcaneImg,
    checklist: [
      'Variety Selection',
      'Land Preparation',
      'Fertilizer Management',
      'Irrigation Guidance',
      'Disease Control'
    ]
  },
  {
    slug: 'banana',
    name: 'Banana Farming',
    cropName: 'Banana',
    image: bananaImg,
    checklist: [
      'Tissue Culture Guidance',
      'Soil & Nutrient Management',
      'Pest & Disease Control',
      'Growth Monitoring',
      'Harvest Planning'
    ]
  },
  {
    slug: 'papaya',
    name: 'Papaya Farming',
    cropName: 'Papaya',
    image: papayaImg,
    checklist: [
      'Variety Selection',
      'Plantation Guidance',
      'Fertilizer Schedule',
      'Irrigation Management',
      'Disease Management'
    ]
  },
  {
    slug: 'watermelon',
    name: 'Watermelon Farming',
    cropName: 'Watermelon',
    image: watermelonImg,
    checklist: [
      'Seed Selection',
      'Land Preparation',
      'Nutrient Management',
      'Pest Control',
      'Harvest Support'
    ]
  }
];

export default function ServicesPage() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    settingsService.getPublic().then((data) => {
      if (data) setSettings(data);
    }).catch(() => {
      setSettings(DEFAULT_SETTINGS);
    });
  }, []);

  const whatsappNumber = settings?.whatsappNumber && !settings.whatsappNumber.includes('98765') ? settings.whatsappNumber : '917975305677';

  const handleBook = (cropName) => {
    openWhatsApp(cropName, '', whatsappNumber);
  };

  return (
    <div className="services-page-root">
      <Navbar settings={settings} />

      <main className="page-main-content">
        <section className="services-overview-section">
          <div className="container">
            {/* Breadcrumb */}
            <div className="page-breadcrumb">
              <span>Home</span>
              <span className="sep">&gt;</span>
              <span className="active">Our Services</span>
            </div>

            {/* Premium Centered Header */}
            <div className="services-header-center">
              <div className="section-sub-tag" style={{ margin: '0 auto 12px' }}>
                <Sprout size={15} />
                <span>Specialized Agronomy</span>
              </div>
              <h1 className="services-main-title">
                Our Organic <em>Services</em>
              </h1>
              <p className="services-main-subtitle">
                Complete commercial farming support from certified seed & plantlet selection to peak brix harvest.
              </p>
              <div className="agri-gold-ornament" aria-hidden="true" style={{ margin: '16px auto 0' }}>
                <span className="agri-ornament-line" />
                <span className="agri-ornament-diamond" />
                <span className="agri-ornament-line" />
              </div>
            </div>

            {/* 4 Crop Cards Grid Matching Reference Image */}
            <div className="services-four-cards-grid">
              {CROP_SERVICES.map((crop, idx) => (
                <motion.div
                  key={crop.slug}
                  className="services-crop-card"
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  {/* Crop Photo */}
                  <Link to={`/services/${crop.slug}`} className="crop-card-img-wrap">
                    <img
                      src={crop.image}
                      alt={`${crop.name} photograph`}
                      className="crop-card-img"
                    />
                  </Link>

                  {/* Title */}
                  <h3 className="crop-card-title">
                    <Link to={`/services/${crop.slug}`}>{crop.name}</Link>
                  </h3>

                  {/* Checklist */}
                  <ul className="crop-card-checklist">
                    {crop.checklist.map((item, cIdx) => (
                      <li key={cIdx}>
                        <span className="check-icon-circle">
                          <Check size={12} strokeWidth={3} />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Actions: View Details and Book Consultation */}
                  <div className="crop-card-actions">
                    <Link
                      to={`/services/${crop.slug}`}
                      className="btn-services-details"
                      title={`View Details for ${crop.name}`}
                    >
                      <span>View Details</span>
                      <ArrowRight size={15} />
                    </Link>

                    <button
                      className="btn-services-book"
                      onClick={() => handleBook(crop.cropName)}
                      title={`Book Consultation for ${crop.name} directly on WhatsApp`}
                    >
                      <span>Book Consultation</span>
                      <ChevronRight size={15} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer settings={settings} />
      <FloatingActions settings={settings} />
    </div>
  );
}
