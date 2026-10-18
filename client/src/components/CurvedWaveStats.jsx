import React from 'react';
import { Leaf, Sprout, TrendingUp, Users, ArrowUpRight } from 'lucide-react';

export default function CurvedWaveStats({
  variant = 'default',
  stat1Num = '4',
  stat1Lbl = 'Crop Categories',
  stat2Num = '100%',
  stat2Lbl = 'Practical Farming Guidance',
  stat3Num = 'Dedicated',
  stat3Lbl = 'Farmer-Focused Support',
  stat1Tag = 'SPECIALIZED',
  stat2Tag = 'VERIFIED',
  stat3Tag = 'DIRECT CARE',
  stat1Sub = 'Sugarcane • Banana • Papaya • Watermelon',
  stat2Sub = 'Field-Proven Organic Protocols',
  stat3Sub = 'On-Demand Agronomist Support'
}) {
  const handleOpenChat = () => {
    window.dispatchEvent(new CustomEvent('open-krishi-chat'));
  };

  const handleCardClick = (index) => {
    if (index === 0) {
      const el = document.getElementById('services');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = '/services';
      }
    } else if (index === 1) {
      const el = document.getElementById('services') || document.getElementById('products');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = '/services';
      }
    } else if (index === 2) {
      handleOpenChat();
    }
  };

  const renderStatValue = (val) => {
    if (val === undefined || val === null) return null;
    const str = String(val).trim();
    if (str.endsWith('%')) {
      const num = str.slice(0, -1);
      return (
        <span className="stat-num-row">
          <span className="stat-num">{num}</span>
          <span className="stat-unit gold">%</span>
        </span>
      );
    }
    if (str.endsWith('+')) {
      const num = str.slice(0, -1);
      return (
        <span className="stat-num-row">
          <span className="stat-num">{num}</span>
          <span className="stat-unit gold">+</span>
        </span>
      );
    }
    if (str === '4') {
      return (
        <span className="stat-num-row">
          <span className="stat-num">4</span>
          <span className="stat-unit gold">+</span>
        </span>
      );
    }
    const isText = isNaN(Number(str));
    return (
      <span className="stat-num-row">
        <span className={`stat-num ${isText ? 'is-text' : ''}`}>{str}</span>
      </span>
    );
  };

  return (
    <div className="hero-bottom-curve-wrap">
      {/* SVG Curved Wave Border with Harvest Gold and Green Accent */}
      <div className="hero-svg-wave-divider">
        <svg
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
          className="hero-wave-svg"
        >
          <defs>
            <linearGradient id="cwsGoldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D6A62E" />
              <stop offset="50%" stopColor="#F5D061" />
              <stop offset="100%" stopColor="#D6A62E" />
            </linearGradient>
            <linearGradient id="cwsForestGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0E5E34" />
              <stop offset="100%" stopColor="#07351D" />
            </linearGradient>
            <filter id="cwsGoldGlow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#D6A62E" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* 1. Emerald accent wave behind main wave */}
          <path
            d="M 940 90 C 1080 34 1250 8 1440 18 L 1440 90 Z"
            fill="#15803D"
            opacity="0.6"
          />
          {/* Secondary gold stroke on the emerald accent */}
          <path
            d="M 940 90 C 1080 34 1250 8 1440 18"
            fill="none"
            stroke="#F5D061"
            strokeWidth="2.5"
          />

          {/* 2. Main Rich Forest Green Wave across entire width */}
          <path
            d="M 0 38 C 160 14 340 20 520 40 C 700 60 880 50 1060 26 C 1190 8 1320 14 1440 32 L 1440 90 L 0 90 Z"
            fill="url(#cwsForestGrad)"
          />

          {/* Glowing Harvest Gold Contour Stroke on Forest Wave */}
          <path
            d="M 0 38 C 160 14 340 20 520 40 C 700 60 880 50 1060 26 C 1190 8 1320 14 1440 32"
            fill="none"
            stroke="url(#cwsGoldGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            filter="url(#cwsGoldGlow)"
          />
        </svg>
      </div>

      {/* Designer Rich Green Stats Ribbon Content Bar */}
      <div className="hero-stats-ribbon green-theme">
        <div className="container">
          <div className="stats-ribbon-flex">
            {/* Stat Card 1 */}
            <div
              className="hero-stat-cell green-card"
              onClick={() => handleCardClick(0)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleCardClick(0)}
              title="Explore Our Core Crops"
            >
              <div className="stat-card-accent-line"></div>
              <span className="stat-card-sparkle">✦</span>
              <ArrowUpRight size={15} className="stat-card-arrow" aria-hidden="true" />

              <div className="stat-circle-icon green">
                <Leaf size={22} className="stat-icon-svg" />
              </div>
              <div className="stat-meta">
                <span className="stat-tag-eyebrow green">
                  <span className="stat-tag-dot green"></span>
                  {stat1Tag}
                </span>
                {renderStatValue(stat1Num)}
                <span className="stat-lbl">{stat1Lbl}</span>
                {stat1Sub && <span className="stat-sub-hint">{stat1Sub}</span>}
              </div>
            </div>

            {/* Stat Card 2 */}
            <div
              className="hero-stat-cell green-card"
              onClick={() => handleCardClick(1)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleCardClick(1)}
              title="Learn About Our Farming Guidance"
            >
              <div className="stat-card-accent-line"></div>
              <span className="stat-card-sparkle">✦</span>
              <ArrowUpRight size={15} className="stat-card-arrow" aria-hidden="true" />

              <div className="stat-circle-icon gold">
                <Sprout size={22} className="stat-icon-svg" />
              </div>
              <div className="stat-meta">
                <span className="stat-tag-eyebrow gold">
                  <span className="stat-tag-dot gold"></span>
                  {stat2Tag}
                </span>
                {renderStatValue(stat2Num)}
                <span className="stat-lbl">{stat2Lbl}</span>
                {stat2Sub && <span className="stat-sub-hint">{stat2Sub}</span>}
              </div>
            </div>

            {/* Stat Card 3 */}
            <div
              className="hero-stat-cell green-card"
              onClick={() => handleCardClick(2)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleCardClick(2)}
              title="Chat with Krishi Organic Assistant"
            >
              <div className="stat-card-accent-line"></div>
              <span className="stat-card-sparkle">✦</span>
              <ArrowUpRight size={15} className="stat-card-arrow" aria-hidden="true" />

              <div className="stat-circle-icon green">
                {stat3Num.includes('Support') || stat3Num === 'Dedicated' ? (
                  <TrendingUp size={22} className="stat-icon-svg" />
                ) : (
                  <Users size={22} className="stat-icon-svg" />
                )}
              </div>
              <div className="stat-meta">
                <span className="stat-tag-eyebrow emerald">
                  <span className="stat-tag-dot pulse"></span>
                  {stat3Tag}
                </span>
                {renderStatValue(stat3Num)}
                <span className="stat-lbl">{stat3Lbl}</span>
                {stat3Sub && <span className="stat-sub-hint">{stat3Sub}</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
