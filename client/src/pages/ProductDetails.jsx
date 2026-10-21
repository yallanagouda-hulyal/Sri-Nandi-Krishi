import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sprout,
  Leaf,
  Check,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Layers,
  Sparkles,
  Award,
  Package
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingActions from '../components/FloatingActions';
import { settingsService, DEFAULT_SETTINGS } from '../services/api';
import { openWhatsApp } from '../utils/whatsapp';
import { getProductById, AGRICULTURE_PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  const product = getProductById(id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    settingsService.getPublic().then((data) => {
      if (data) setSettings(data);
    }).catch(() => {
      setSettings(DEFAULT_SETTINGS);
    });
  }, [id]);

  const whatsappNumber = settings?.whatsappNumber && !settings.whatsappNumber.includes('98765') ? settings.whatsappNumber : '917975305677';

  const handleEnquire = () => {
    if (!product) return;
    const msg = `Hello Sri Nandi Krishi Organic Enterprise, I am interested in ${product.name} (${product.subtitle}). Please share dosage instructions and availability for my farm.`;
    openWhatsApp('', msg, whatsappNumber);
  };

  if (!product) {
    return (
      <div className="product-details-root">
        <Navbar settings={settings} />
        <main className="container" style={{ padding: '120px 20px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', color: '#07351D', marginBottom: '16px' }}>
            Product Not Found
          </h2>
          <p style={{ color: '#556B5D', marginBottom: '24px' }}>
            The agricultural product you are looking for is unavailable or has been relocated.
          </p>
          <Link
            to="/products"
            className="btn btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <ArrowLeft size={16} /> Back to All Products
          </Link>
        </main>
        <Footer settings={settings} />
        <FloatingActions settings={settings} />
      </div>
    );
  }

  return (
    <div className="product-details-root" style={{ backgroundColor: '#FAF8EF', minHeight: '100vh' }}>
      <Navbar settings={settings} />

      <main className="page-main-content" style={{ padding: '40px 0 80px 0' }}>
        <div className="container">
          {/* Breadcrumb Navigation */}
          <nav className="page-breadcrumb" aria-label="Breadcrumb" style={{ marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: '#556B5D' }}>
            <Link to="/" style={{ color: '#126338', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
            <span>&gt;</span>
            <Link to="/products" style={{ color: '#126338', textDecoration: 'none', fontWeight: 600 }}>Products</Link>
            <span>&gt;</span>
            <span style={{ color: '#07351D', fontWeight: 700 }}>{product.name}</span>
          </nav>

          {/* Main Product Showcase Card */}
          <div className="product-showcase-master-card">
            {/* Left: Product Image Stage */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="product-img-stage"
            >
              <img
                src={product.image}
                alt={`${product.name} packaging`}
                className="product-img-photo"
              />
              <span className="product-stage-badge">
                {product.badge}
              </span>
            </motion.div>

            {/* Right: Product Details & Specifications */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="product-details-col"
            >
              <div className="product-cat-tag">
                <Sprout size={16} color="#126338" />
                <span>{product.categoryLabel}</span>
              </div>

              <h1 className="product-details-title">
                {product.name}
              </h1>

              <h2 className="product-details-subtitle">
                {product.subtitle}
              </h2>

              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#F8F6EC', border: '1px solid rgba(217, 167, 46, 0.4)', padding: '6px 14px', borderRadius: '10px', fontSize: '0.86rem', color: '#07351D', fontWeight: 600, marginBottom: '20px' }}>
                <Package size={15} color="#D9A72E" />
                <span>Packaging: {product.netContent}</span>
              </div>

              <p style={{ color: '#4C5E53', lineHeight: 1.7, fontSize: '0.98rem', marginBottom: '24px' }}>
                {product.description}
              </p>

              {/* Key Highlights Checklist */}
              <div style={{ marginBottom: '28px' }}>
                <h3 style={{ fontSize: '0.94rem', fontWeight: 700, color: '#07351D', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>
                  Key Agronomic Benefits:
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {product.highlights.map((item, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.92rem', color: '#314238' }}>
                      <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#D9A72E', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', flexShrink: 0, marginTop: '2px' }}>
                        <Check size={12} strokeWidth={3} />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommended Crops Tags */}
              {product.recommendedCrops && (
                <div style={{ marginBottom: '32px' }}>
                  <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#556B5D', display: 'block', marginBottom: '8px' }}>
                    Recommended For Commercial Crops:
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {product.recommendedCrops.map((crop, idx) => (
                      <span
                        key={idx}
                        style={{
                          background: 'rgba(18, 99, 56, 0.08)',
                          color: '#0B4D2B',
                          padding: '4px 12px',
                          borderRadius: '9999px',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          border: '1px solid rgba(18, 99, 56, 0.2)'
                        }}
                      >
                        {crop}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={handleEnquire}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    background: '#0B4D2B',
                    color: '#FFFFFF',
                    padding: '14px 28px',
                    borderRadius: '9999px',
                    border: '1.5px solid #D9A72E',
                    fontWeight: 700,
                    fontSize: '0.98rem',
                    cursor: 'pointer',
                    boxShadow: '0 8px 20px rgba(11, 77, 43, 0.25)',
                    transition: 'all 0.25s ease'
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.background = '#126338')}
                  onMouseOut={(e) => (e.currentTarget.style.background = '#0B4D2B')}
                >
                  <FaWhatsapp size={20} />
                  <span>Enquire on WhatsApp</span>
                </button>

                <Link
                  to="/products"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'transparent',
                    color: '#07351D',
                    padding: '14px 22px',
                    borderRadius: '9999px',
                    border: '1.5px solid rgba(11, 77, 43, 0.3)',
                    fontWeight: 600,
                    fontSize: '0.92rem',
                    textDecoration: 'none',
                    transition: 'all 0.25s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = '#D9A72E';
                    e.currentTarget.style.background = '#FFFFFF';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(11, 77, 43, 0.3)';
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <ArrowLeft size={16} /> Back to Products
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Related Agriculture Products Section */}
          <div style={{ marginTop: '54px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <span style={{ color: '#B5881D', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                  EXPLORE MORE
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.65rem',
                    color: '#07351D',
                    margin: '4px 0 0 0'
                  }}
                >
                  Related Agriculture Products
                </h3>
              </div>
              <Link
                to="/products"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#126338',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  textDecoration: 'none'
                }}
              >
                <span>View All Products</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="products-catalog-grid">
              {AGRICULTURE_PRODUCTS.filter((p) => p.id !== product.id)
                .slice(0, 4)
                .map((relatedProd) => (
                  <ProductCard
                    key={relatedProd.id}
                    product={relatedProd}
                    whatsappNumber={settings?.whatsappNumber}
                  />
                ))}
            </div>
          </div>
        </div>
      </main>

      <Footer settings={settings} />
      <FloatingActions settings={settings} />
    </div>
  );
}
