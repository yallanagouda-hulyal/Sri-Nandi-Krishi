import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, ArrowRight } from 'lucide-react';
import { getFeaturedProducts } from '../data/products';
import ProductCard from './ProductCard';
import './AgricultureProducts.css';

export default function AgricultureProducts({ settings }) {
  const featuredProducts = getFeaturedProducts();

  return (
    <section className="agri-products-section" id="agriculture-products">
      <div className="container">
        {/* Section Header */}
        <motion.div
          className="agri-header-wrap"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Eyebrow with Gold Side Lines */}
          <div className="agri-eyebrow-flex">
            <span className="agri-eyebrow-line" />
            <span className="agri-eyebrow-pill">
              OUR AGRICULTURE PRODUCTS
            </span>
            <span className="agri-eyebrow-line right" />
          </div>

          {/* Main Serif Heading */}
          <h2 className="agri-main-title">
            Better Soil. Stronger Crops. Naturally.
          </h2>

          {/* Subtitle */}
          <p className="agri-main-subtitle">
            Discover our organic fertilizers and plant growth solutions for healthy soil, vibrant crops and sustainable farming.
          </p>

          {/* Golden Center Ornament */}
          <div className="agri-gold-ornament" aria-hidden="true">
            <span className="agri-ornament-line" />
            <span className="agri-ornament-diamond" />
            <span className="agri-ornament-line" />
          </div>
        </motion.div>

        {/* 4-Product Cards Grid */}
        <div className="agri-cards-grid">
          {featuredProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
            >
              <ProductCard product={product} whatsappNumber={settings?.whatsappNumber} />
            </motion.div>
          ))}
        </div>

        {/* Centered Bottom CTA: Explore All Products */}
        <div className="agri-bottom-cta-wrap">
          <Link to="/products" className="agri-explore-all-btn" title="Explore all agriculture products">
            <Leaf size={18} />
            <span>Explore All Products</span>
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
