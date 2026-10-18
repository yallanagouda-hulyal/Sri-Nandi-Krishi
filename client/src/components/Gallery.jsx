import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sprout, Eye } from 'lucide-react';
import Lightbox from './Lightbox';
import { galleryService } from '../services/api';

import sugarcaneFieldImg from '../assets/sugarcane-field.jpg';
import sugarcaneRowsImg from '../assets/sugarcane-rows.jpg';
import bananaImg from '../assets/banana.jpg';
import hdBananaPlantationImg from '../assets/hd-banana-plantation.jpg';
import papayaImg from '../assets/papaya.jpg';
import papayaTreeImg from '../assets/papaya-tree.jpg';
import watermelonImg from '../assets/watermelon.jpg';
import hdWatermelonFieldImg from '../assets/hd-watermelon-field.jpg';
import tractorImg from '../assets/farm-tractor.jpg';
import fieldImg from '../assets/farm-field.jpg';

const FALLBACK_GALLERY = [
  {
    _id: 'g1',
    title: 'Vibrant Sugarcane Plantation',
    category: 'Sugarcane',
    imageUrl: sugarcaneFieldImg,
    caption: 'Lush sugarcane crop with robust stalk formation and uniform canopy.',
  },
  {
    _id: 'g2',
    title: 'Precision Furrow Rows',
    category: 'Sugarcane',
    imageUrl: sugarcaneRowsImg,
    caption: 'Optimal row spacing and drip installation for enhanced tillering.',
  },
  {
    _id: 'g3',
    title: 'Banana Plantation Support',
    category: 'Banana',
    imageUrl: bananaImg,
    caption: 'Heavy bunch setting on healthy banana plants following micronutrient feeding.',
  },
  {
    _id: 'g4',
    title: 'Commercial Banana Plantation',
    category: 'Banana',
    imageUrl: hdBananaPlantationImg,
    caption: 'High-density G9 tissue culture plantation with vigorous canopy and root development.',
  },
  {
    _id: 'g5',
    title: 'Papaya Raised Bed Farming',
    category: 'Papaya',
    imageUrl: papayaImg,
    caption: 'Prolific fruiting of Red Lady papaya trees with proper root drainage.',
  },
  {
    _id: 'g6',
    title: 'Red Lady 786 Papaya Orchard',
    category: 'Papaya',
    imageUrl: papayaTreeImg,
    caption: 'Heavy fruit set on high-yielding gynodioecious papaya trees.',
  },
  {
    _id: 'g7',
    title: 'Sweet Watermelon Harvest',
    category: 'Watermelon',
    imageUrl: watermelonImg,
    caption: 'Uniform and sweet watermelon fruit ready for wholesale market dispatch.',
  },
  {
    _id: 'g8',
    title: 'Precision Mulched Watermelon Field',
    category: 'Watermelon',
    imageUrl: hdWatermelonFieldImg,
    caption: 'Silver-black mulching film and inline drip fertigation for maximum melon yield.',
  },
  {
    _id: 'g9',
    title: 'Deep Tillage & Field Prep',
    category: 'Field Work',
    imageUrl: tractorImg,
    caption: 'Tractor land preparation and basal manure incorporation.',
  },
  {
    _id: 'g10',
    title: 'Wide Agricultural Farmland',
    category: 'Field Work',
    imageUrl: fieldImg,
    caption: 'Comprehensive soil survey and farmland assessment for sustainable guidance.',
  }
];

const CATEGORIES = ['All', 'Sugarcane', 'Banana', 'Papaya', 'Watermelon', 'Field Work'];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [galleryItems, setGalleryItems] = useState(FALLBACK_GALLERY);
  const [activeLightboxImg, setActiveLightboxImg] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const data = await galleryService.getAll();
        if (data && data.length > 0) {
          setGalleryItems(data);
        }
      } catch (err) {
        // Fallback already in state
      }
    };
    fetchGallery();
  }, []);

  const filteredItems = selectedCategory === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === selectedCategory);

  return (
    <section className="gallery-section" id="gallery">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Sprout size={15} />
            <span>Farm Gallery</span>
          </div>

          <h2 className="section-title">
            Our Fields in <em>Focus</em>
          </h2>

          <p className="section-subtitle">
            A glimpse into actual farm visits, crop stages, and successful agricultural outcomes across Sugarcane, Banana, Papaya, and Watermelon.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="gallery-filters">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`gallery-filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div
          className="gallery-grid"
          layout
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item._id || item.imageUrl}
                className="gallery-item"
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35 }}
                onClick={() => setActiveLightboxImg(item)}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title || 'Sri Nandi Krishi Farm Photograph'}
                  className="gallery-thumb"
                  loading="lazy"
                />
                <div className="gallery-overlay">
                  <b>{item.title}</b>
                  <small>{item.category} • Click to enlarge</small>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox Modal */}
        <Lightbox
          image={activeLightboxImg}
          onClose={() => setActiveLightboxImg(null)}
        />
      </div>
    </section>
  );
}
