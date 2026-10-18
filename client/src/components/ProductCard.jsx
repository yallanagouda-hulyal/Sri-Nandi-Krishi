import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Leaf, TrendingUp, ArrowRight } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { openWhatsApp } from '../utils/whatsapp';
import './ProductCard.css';

export default function ProductCard({ product, whatsappNumber }) {
  if (!product) return null;

  const benefits = product.threeBenefits || [
    'Enriches soil with organic nutrients',
    'Improves soil health naturally',
    'Supports strong crop growth'
  ];

  const handleWhatsApp = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const customMessage = `Hello Sri Nandi Krishi Organic Enterprise, I am interested in ${product.name} (${product.subtitle || 'Organic Agriculture Product'}). Please share dosage guidelines, pricing, and farm delivery details.`;
    openWhatsApp('', customMessage, whatsappNumber);
  };

  return (
    <article className="premium-product-card" id={`card-${product.slug}`}>
      {/* 1. Agricultural Visual Area (HD 3D Product Showcase) */}
      <Link
        to={`/products/${product.slug}`}
        className="product-card-visual-frame"
        title={`View ${product.name} details`}
      >
        {/* Ultra-HD 3D Photorealistic Product Showcase */}
        <img
          src={product.image}
          alt={`${product.name} — ${product.subtitle}`}
          className="product-visual-hd-img"
          loading="lazy"
        />

        {/* Organic Curved Gold Dividing Arc */}
        <svg
          className="product-visual-curve-divider"
          viewBox="0 0 400 24"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M 0,0 Q 200,24 400,0 L 400,24 L 0,24 Z" fill="#FFFFFF" />
          <path d="M 0,0 Q 200,24 400,0" fill="none" stroke="#D9A72E" strokeWidth="2.2" />
        </svg>
      </Link>

      {/* 2. Card Content Body */}
      <div className="product-card-body">
        {/* Header: Gold circular icon badge + Product Title & Subtitle */}
        <div className="product-card-header">
          <div className="product-card-icon-badge" aria-hidden="true">
            <Sprout size={20} strokeWidth={2.4} />
          </div>
          <div className="product-card-title-col">
            <h3 className="product-card-title">
              <Link to={`/products/${product.slug}`}>{product.name}</Link>
            </h3>
            <span className="product-card-subtitle">{product.subtitle}</span>
          </div>
        </div>

        {/* 3 Short Bullet Benefits with Custom Green Agriculture Icons */}
        <ul className="product-card-benefits">
          {benefits.slice(0, 3).map((benefit, idx) => (
            <li key={idx} className="product-benefit-item">
              <span className="benefit-icon-wrap" aria-hidden="true">
                {idx === 0 && <Leaf size={15} strokeWidth={2.4} />}
                {idx === 1 && <Sprout size={15} strokeWidth={2.4} />}
                {idx === 2 && <TrendingUp size={15} strokeWidth={2.4} />}
              </span>
              <span className="benefit-text">{benefit}</span>
            </li>
          ))}
        </ul>

        {/* Full-width Dark Green View Details Button & Direct WhatsApp Button */}
        <div className="product-card-action-row">
          <Link
            to={`/products/${product.slug}`}
            className="product-card-btn-view"
            title={`View ${product.name} details`}
          >
            <span>View Details</span>
            <ArrowRight size={16} strokeWidth={2.4} />
          </Link>

          <button
            type="button"
            className="product-card-wa-btn"
            onClick={handleWhatsApp}
            title={`Order or enquire about ${product.name} directly on WhatsApp`}
            aria-label={`Chat on WhatsApp about ${product.name}`}
          >
            <FaWhatsapp size={20} />
          </button>
        </div>
      </div>
    </article>
  );
}
