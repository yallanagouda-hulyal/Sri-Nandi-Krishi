import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Image as ImageIcon } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingActions from '../components/FloatingActions';
import { galleryService, settingsService, DEFAULT_SETTINGS } from '../services/api';

import sugarcaneField from '../assets/sugarcane-field.jpg';
import sugarcaneRows from '../assets/sugarcane-rows.jpg';
import bananaImg from '../assets/banana.jpg';
import hdBananaPlantation from '../assets/hd-banana-plantation.jpg';
import papayaImg from '../assets/papaya.jpg';
import papayaTree from '../assets/papaya-tree.jpg';
import watermelonImg from '../assets/watermelon.jpg';
import hdWatermelonField from '../assets/hd-watermelon-field.jpg';
import farmField from '../assets/farm-field.jpg';
import farmTractor from '../assets/farm-tractor.jpg';

const DEFAULT_GALLERY = [
  { id: 1, title: 'Vibrant Sugarcane Plantation', category: 'Sugarcane', image: sugarcaneField },
  { id: 2, title: 'Sugarcane Cultivation Rows', category: 'Sugarcane', image: sugarcaneRows },
  { id: 3, title: 'Healthy Banana Bunch', category: 'Banana', image: bananaImg },
  { id: 4, title: 'Commercial Banana Plantation', category: 'Banana', image: hdBananaPlantation },
  { id: 5, title: 'Papaya Orchard Fruit Set', category: 'Papaya', image: papayaImg },
  { id: 6, title: 'Red Lady 786 Papaya Orchard', category: 'Papaya', image: papayaTree },
  { id: 7, title: 'Sweet Watermelon Harvest', category: 'Watermelon', image: watermelonImg },
  { id: 8, title: 'Precision Mulched Watermelon Field', category: 'Watermelon', image: hdWatermelonField },
  { id: 9, title: 'Mechanized Field Preparation', category: 'Field Work', image: farmTractor },
  { id: 10, title: 'Organic Agricultural Farmland', category: 'Field Work', image: farmField }
];

const CATEGORIES = ['All', 'Sugarcane', 'Banana', 'Papaya', 'Watermelon', 'Field Work'];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [items, setItems] = useState(DEFAULT_GALLERY);
  const [activeImage, setActiveImage] = useState(null);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    settingsService.getPublic().then((data) => {
      if (data) setSettings(data);
    }).catch(() => {
      setSettings(DEFAULT_SETTINGS);
    });

    galleryService.getAll().then((data) => {
      if (data && data.length > 0) {
        // Map db images
        const formatted = data.map((d, i) => ({
          id: d._id || i,
          title: d.title,
          category: d.category,
          image: d.imageUrl || DEFAULT_GALLERY[i % DEFAULT_GALLERY.length].image
        }));
        setItems(formatted);
      }
    }).catch(() => {
      setItems(DEFAULT_GALLERY);
    });
  }, []);

  const filteredItems = activeCategory === 'All'
    ? items
    : items.filter(x => x.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="gallery-page-root">
      <Navbar settings={settings} />

      <main className="page-main-content">
        <section className="gallery-overview-section">
          <div className="container">
            {/* Breadcrumb */}
            <div className="page-breadcrumb">
              <span>Home</span>
              <span className="sep">&gt;</span>
              <span className="active">Gallery</span>
            </div>

            {/* Header */}
            <div className="gallery-header-wrap">
              <h1 className="gallery-page-title">Farm Gallery</h1>
              <p className="gallery-page-subtitle">
                Real moments from farms, crops and field activities.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="gallery-filter-tabs">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`gallery-filter-pill ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Image Grid */}
            <motion.div
              layout
              className="gallery-cards-grid"
            >
              <AnimatePresence>
                {filteredItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.35 }}
                    className="gallery-card-item"
                    onClick={() => setActiveImage(item)}
                  >
                    <div className="gallery-card-thumb-wrap">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="gallery-card-thumb"
                        loading="lazy"
                      />
                      <div className="gallery-card-overlay">
                        <span className="gallery-zoom-badge">
                          <ZoomIn size={18} />
                        </span>
                        <div className="gallery-card-caption">
                          <h4>{item.title}</h4>
                          <small>{item.category}</small>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {activeImage && (
            <motion.div
              className="gallery-lightbox-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveImage(null)}
            >
              <button
                className="lightbox-close-btn"
                onClick={() => setActiveImage(null)}
                aria-label="Close Preview"
              >
                <X size={26} />
              </button>
              <div
                className="lightbox-content-wrap"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={activeImage.image}
                  alt={activeImage.title}
                  className="lightbox-full-img"
                />
                <div className="lightbox-info-bar">
                  <h3>{activeImage.title}</h3>
                  <span>{activeImage.category}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer settings={settings} />
      <FloatingActions settings={settings} />
    </div>
  );
}
