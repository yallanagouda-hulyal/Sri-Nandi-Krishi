import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingActions from '../components/FloatingActions';
import ProductCard from '../components/ProductCard';
import { settingsService } from '../services/api';
import { AGRICULTURE_PRODUCTS } from '../data/products';

export default function ProductsPage() {
  const [settings, setSettings] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    settingsService
      .getPublic()
      .then((data) => {
        if (data) setSettings(data);
      })
      .catch(console.error);
  }, []);

  const filteredProducts = AGRICULTURE_PRODUCTS.filter((prod) => {
    if (filter === 'all') return true;
    if (filter === 'fertilizer') return prod.category === 'fertilizer';
    if (filter === 'biostimulant') return prod.category === 'biostimulant';
    return true;
  });

  return (
    <div className="products-page-root" style={{ backgroundColor: '#FAF8EF', minHeight: '100vh' }}>
      <Navbar settings={settings} />

      <main className="page-main-content" style={{ padding: '40px 0 90px 0' }}>
        <div className="container">
          {/* Breadcrumb Navigation */}
          <nav
            className="page-breadcrumb"
            aria-label="Breadcrumb"
            style={{
              marginBottom: '28px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.88rem',
              color: '#556B5D'
            }}
          >
            <Link to="/" style={{ color: '#126338', textDecoration: 'none', fontWeight: 600 }}>
              Home
            </Link>
            <span>&gt;</span>
            <span style={{ color: '#07351D', fontWeight: 700 }}>Our Agriculture Products</span>
          </nav>

          {/* Page Banner / Header */}
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 40px auto' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#B5881D',
                fontWeight: 700,
                fontSize: '0.84rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: '10px'
              }}
            >
              <Leaf size={16} color="#126338" />
              <span>100% ORGANIC SOLUTIONS</span>
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.2rem, 4vw, 3rem)',
                color: '#07351D',
                margin: '0 0 14px 0',
                lineHeight: 1.2
              }}
            >
              Agriculture Products &amp; Solutions
            </h1>

            <p
              style={{
                color: '#556B5D',
                fontSize: '1.05rem',
                lineHeight: 1.6,
                margin: '0 auto 24px auto',
                maxWidth: '680px'
              }}
            >
              Certified organic fertilizers, high-potency bio-stimulants, and natural soil conditioners engineered for commercial sugarcane, banana, papaya, and watermelon growers.
            </p>

            {/* Filter Tabs */}
            <div
              style={{
                display: 'inline-flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '8px',
                background: 'rgba(18, 99, 56, 0.08)',
                padding: '6px',
                borderRadius: '9999px',
                border: '1px solid rgba(217, 167, 46, 0.3)'
              }}
            >
              <button
                type="button"
                onClick={() => setFilter('all')}
                style={{
                  padding: '8px 20px',
                  borderRadius: '9999px',
                  fontWeight: 700,
                  fontSize: '0.86rem',
                  border: 'none',
                  cursor: 'pointer',
                  background: filter === 'all' ? '#0B4D2B' : 'transparent',
                  color: filter === 'all' ? '#FFFFFF' : '#07351D',
                  transition: 'all 0.25s ease'
                }}
              >
                All Products ({AGRICULTURE_PRODUCTS.length})
              </button>

              <button
                type="button"
                onClick={() => setFilter('fertilizer')}
                style={{
                  padding: '8px 20px',
                  borderRadius: '9999px',
                  fontWeight: 700,
                  fontSize: '0.86rem',
                  border: 'none',
                  cursor: 'pointer',
                  background: filter === 'fertilizer' ? '#0B4D2B' : 'transparent',
                  color: filter === 'fertilizer' ? '#FFFFFF' : '#07351D',
                  transition: 'all 0.25s ease'
                }}
              >
                Fertilizers &amp; Manure (
                {AGRICULTURE_PRODUCTS.filter((p) => p.category === 'fertilizer').length})
              </button>

              <button
                type="button"
                onClick={() => setFilter('biostimulant')}
                style={{
                  padding: '8px 20px',
                  borderRadius: '9999px',
                  fontWeight: 700,
                  fontSize: '0.86rem',
                  border: 'none',
                  cursor: 'pointer',
                  background: filter === 'biostimulant' ? '#0B4D2B' : 'transparent',
                  color: filter === 'biostimulant' ? '#FFFFFF' : '#07351D',
                  transition: 'all 0.25s ease'
                }}
              >
                Bio-Stimulants &amp; Tonics (
                {AGRICULTURE_PRODUCTS.filter((p) => p.category === 'biostimulant').length})
              </button>
            </div>
          </div>

          {/* Unified 4-Column Products Grid */}
          <div className="products-catalog-grid">
            {filteredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.3) }}
              >
                <ProductCard product={product} whatsappNumber={settings?.whatsappNumber} />
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer settings={settings} />
      <FloatingActions settings={settings} />
    </div>
  );
}
