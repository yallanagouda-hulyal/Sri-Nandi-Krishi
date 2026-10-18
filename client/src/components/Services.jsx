import React from 'react';
import { motion } from 'framer-motion';
import ServiceCard from './ServiceCard';

import sugarcaneCropImg from '../assets/sugarcane-crop.jpg';
import sugarcaneFieldImg from '../assets/sugarcane-field.jpg';
import sugarcaneCloseImg from '../assets/sugarcane-closeup.jpg';
import bananaImg from '../assets/banana.jpg';
import papayaImg from '../assets/papaya.jpg';
import watermelonImg from '../assets/watermelon.jpg';

export const CROP_SERVICES_DATA = [
  {
    slug: 'sugarcane',
    name: 'Sugarcane Farming',
    cropName: 'Sugarcane',
    subtitle: 'High yield • Better quality • Expert guidance',
    shortDescription: 'Complete guidance from sett selection to harvest with modern and organic methods.',
    cardImage: sugarcaneCropImg,
    heroImage: sugarcaneFieldImg,
    secondaryImage: sugarcaneCloseImg,
    highlights: [
      'Variety Selection',
      'Fertilizer Guidance',
      'Irrigation Management',
      'Disease Control',
      'Harvest Support'
    ],
    showcaseTitle: 'Complete Guidance for Sugarcane Cultivation',
    showcaseDesc: 'Get professional support from land preparation to harvest with modern and organic methods.',
    keyBenefits: [
      'Better Yield & Sugar Recovery',
      'Healthy Crop & Stalk Growth',
      'Reduced Pest & Disease Loss',
      'Expert Agronomic Consultation'
    ]
  },
  {
    slug: 'banana',
    name: 'Banana Farming',
    cropName: 'Banana',
    subtitle: 'Healthy plants • Higher yield • Better profit',
    shortDescription: 'Expert consultation for banana plant cultivation with scientific and organic methods.',
    cardImage: bananaImg,
    heroImage: bananaImg,
    secondaryImage: bananaImg,
    highlights: [
      'Tissue Culture Guidance',
      'Soil & Nutrient Management',
      'Pest & Disease Control',
      'Growth Monitoring'
    ],
    showcaseTitle: 'Complete Support for Banana Cultivation',
    showcaseDesc: 'Get professional support from tissue culture planting to bunch protection and premium marketing.',
    keyBenefits: [
      'Healthy Plant & Leaf Growth',
      'Better Fruit Quality & Uniformity',
      'Improved Bunch Weight & Yield',
      'Market & Post-Harvest Guidance'
    ]
  },
  {
    slug: 'papaya',
    name: 'Papaya Farming',
    cropName: 'Papaya',
    subtitle: 'Fast growth • High demand • Good returns',
    shortDescription: 'Complete guidance for papaya cultivation with modern and responsible techniques.',
    cardImage: papayaImg,
    heroImage: papayaImg,
    secondaryImage: papayaImg,
    highlights: [
      'Variety Selection',
      'Plantation Guidance',
      'Fertilizer Schedule',
      'Disease Management'
    ],
    showcaseTitle: 'Complete Guidance for Papaya Cultivation',
    showcaseDesc: 'Comprehensive guidance for raised bed preparation, root disease prevention, and high-brix sweet fruit.',
    keyBenefits: [
      'Healthy & Vigorous Plants',
      'Quality Disease-Resistant Fruits',
      'Better Wholesale Market Value',
      'Direct Stage-by-Stage Support'
    ]
  },
  {
    slug: 'watermelon',
    name: 'Watermelon Farming',
    cropName: 'Watermelon',
    subtitle: 'Healthy crop • Sweet fruit • Better income',
    shortDescription: 'Expert support for watermelon cultivation from sowing to high-yield harvest.',
    cardImage: watermelonImg,
    heroImage: watermelonImg,
    secondaryImage: watermelonImg,
    highlights: [
      'Seed Selection',
      'Land Preparation',
      'Nutrient Management',
      'Pest Control'
    ],
    showcaseTitle: 'Complete Guidance for Watermelon Cultivation',
    showcaseDesc: 'Get professional support from seed selection, mulching bed setup, to harvest brix management.',
    keyBenefits: [
      'Crisp & High-Sugar Sweet Fruits',
      'Heavier Fruit Yield per Acre',
      'Effective Pest & Mildew Control',
      'Harvest & Wholesale Market Timing'
    ]
  }
];

export const DEFAULT_SERVICES = CROP_SERVICES_DATA;

export default function Services({ settings }) {
  const whatsappNumber = settings?.whatsappNumber || '919876543210';

  return (
    <section className="services-section" id="services">
      <div className="container">
        {/* Section Header */}
        <div className="services-header-wrap">
          <div className="services-ornament-title">
            <span className="ornament-leaf">🌿</span>
            <h2 className="services-main-title">
              Our <span className="gold-text">Services</span>
            </h2>
          </div>
          <p className="services-main-subtitle">
            Complete farming support from plantation to harvest.
          </p>
        </div>

        {/* 4 Crop Overview Cards */}
        <motion.div
          className="our-services-cards-grid"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {CROP_SERVICES_DATA.map((service) => (
            <ServiceCard
              key={service.slug}
              service={service}
              whatsappNumber={whatsappNumber}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
