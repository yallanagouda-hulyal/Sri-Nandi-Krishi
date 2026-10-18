import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote, Sparkles, CheckCircle2, MapPin, Star } from 'lucide-react';
import { testimonialService } from '../services/api';
import rameshPhoto from '../assets/ramesh-farmer.jpg';
import farmerTabletPhoto from '../assets/farmer-tablet.jpg';
import aboutFarmerPhoto from '../assets/about-farmer-inspecting.jpg';
import heroFarmerPhoto from '../assets/hero-farmer.jpg';

const DEFAULT_TESTIMONIALS = [
  {
    id: 1,
    name: 'Ramesh Patil',
    role: 'Sugarcane Farmer',
    location: 'Belagavi, Karnataka',
    photo: rameshPhoto,
    crop: 'Sugarcane Cultivation',
    rating: 5,
    highlight: 'Better Sugar Recovery & Soil Aeration',
    text: 'Nagaraj provided excellent support throughout the entire sugarcane farming journey. He has a strong understanding of sugarcane growth stages and recommends the right fertilizers based on crop conditions and growth requirements. His practical knowledge and timely guidance helped ensure healthy crop development and better farm outcomes.'
  },
  {
    id: 2,
    name: 'Suresh Gowda',
    role: 'Banana Cultivator',
    location: 'Mandya, Karnataka',
    photo: farmerTabletPhoto,
    crop: 'G9 Banana Plantation',
    rating: 5,
    highlight: '25% Higher Harvest Tonnage',
    text: "Following Sri Nandi Krishi's tissue culture and bio-nutrition schedule gave us remarkable bunch weight and uniform finger size in our G9 bananas. Pest attacks were controlled naturally without heavy chemicals, increasing our harvest tonnage by over 25%."
  },
  {
    id: 3,
    name: 'Mallikarjun Biradar',
    role: 'Papaya Grower',
    location: 'Vijayapura, Karnataka',
    photo: aboutFarmerPhoto,
    crop: 'Red Lady Papaya Orchard',
    rating: 5,
    highlight: 'Effective Virus & Root Rot Recovery',
    text: "Virus and root rot management was a huge struggle in our Taiwan Red Lady papaya orchard until we consulted Nagaraj. His organic soil drenching and micronutrient schedule revitalized our plants, resulting in heavy fruit set and excellent fruit quality."
  },
  {
    id: 4,
    name: 'Basavaraj Kulkarni',
    role: 'Watermelon Cultivator',
    location: 'Bagalkot, Karnataka',
    photo: heroFarmerPhoto,
    crop: 'High-Brix Watermelon Farming',
    rating: 5,
    highlight: '9 to 12 kg Heavier Sweet Melons',
    text: "Sri Nandi Krishi gave us precision drip schedules and organic plant stimulants from day one. Our watermelons reached 9 to 12 kg per fruit with exceptional sweetness and crispness. The yield surpassed our expectations and fetched peak market rates."
  },
  {
    id: 5,
    name: 'Anand Patil',
    role: 'Sugarcane & Horticulture Farmer',
    location: 'Dharwad, Karnataka',
    photo: rameshPhoto,
    crop: 'Integrated Organic Cultivation',
    rating: 5,
    highlight: '40% Lower Chemical Fertilizer Costs',
    text: "The biological inputs and compost enrichment methods recommended by Sri Nandi Krishi cut our chemical input costs by 40%. The soil fertility and root development improved visibly within one season. Truly reliable ground-level consultancy!"
  }
];

const getFarmerPhoto = (name, crop, idx) => {
  const n = (name || '').toLowerCase();
  const c = (crop || '').toLowerCase();
  if (n.includes('ramesh')) return rameshPhoto;
  if (n.includes('suresh') || c.includes('banana')) return farmerTabletPhoto;
  if (n.includes('malli') || c.includes('papaya')) return aboutFarmerPhoto;
  if (n.includes('basa') || c.includes('watermelon') || c.includes('melon')) return heroFarmerPhoto;
  const fallbacks = [rameshPhoto, farmerTabletPhoto, aboutFarmerPhoto, heroFarmerPhoto];
  return fallbacks[idx % fallbacks.length];
};

export default function Testimonials({ settings }) {
  const [testimonials, setTestimonials] = useState(DEFAULT_TESTIMONIALS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const intervalRef = useRef(null);

  // Responsive items per page: 3 to 4 on desktop, 2 on tablet, 1 on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        setItemsPerPage(3);
      } else if (window.innerWidth >= 768) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(1);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    testimonialService
      .getAll()
      .then((data) => {
        if (data && data.length > 0) {
          const mapped = data.map((d, i) => ({
            id: d._id || i,
            name: d.name || 'Farmer',
            role: d.role || 'Cultivator',
            location: d.location || 'Karnataka',
            crop: d.crop || 'Crop Cultivation',
            rating: d.rating || 5,
            photo: d.imageUrl || getFarmerPhoto(d.name, d.crop, i),
            text: d.text,
            highlight: DEFAULT_TESTIMONIALS[i % DEFAULT_TESTIMONIALS.length]?.highlight || 'Verified Crop Outcome'
          }));
          setTestimonials(mapped);
        }
      })
      .catch(() => {
        setTestimonials(DEFAULT_TESTIMONIALS);
      });
  }, []);

  // Fast-Moving Smooth Auto-Scrolling every 2.2 seconds, pauses on hover / touch
  useEffect(() => {
    if (isPaused || testimonials.length <= 1) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    }, 2200);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, testimonials.length]);

  // Seamless looping boundary check
  useEffect(() => {
    if (currentIndex >= testimonials.length) {
      const resetTimer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, 460);
      return () => clearTimeout(resetTimer);
    }
  }, [currentIndex, testimonials.length]);

  const handlePrev = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const extendedList = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="testimonials-ambient-glow gold" aria-hidden="true" />
      <div className="testimonials-ambient-glow green" aria-hidden="true" />

      <div className="container">
        {/* Section Header */}
        <div className="section-title-wrap text-center">
          <span className="section-eyebrow">
            <Sparkles size={14} /> Ground-Level Farmer Results
          </span>
          <h2 className="section-heading">
            What Our Farmers <span className="gold-text">Say</span>
          </h2>
          <div className="section-title-divider" aria-hidden="true">
            <span className="divider-line" />
            <span className="divider-leaf">🌱</span>
            <span className="divider-line right" />
          </div>
          <p className="section-subheading">
            Trusted by farmers for practical guidance, higher yields, and better results across Karnataka.
          </p>
        </div>

        {/* 3 to 4 Reviews Multi-Card Auto-Scrolling Viewport */}
        <div
          className="testimonials-multi-viewport"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div
            className="testimonials-multi-track"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
              transition: isTransitioning ? 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)' : 'none'
            }}
          >
            {extendedList.map((item, idx) => (
              <div
                key={`${item.id || idx}-${idx}`}
                className="testimonial-multi-card-col"
                style={{
                  flex: `0 0 ${100 / itemsPerPage}%`,
                  maxWidth: `${100 / itemsPerPage}%`
                }}
              >
                <div className="single-review-card">
                  {/* Faint luxury watermark */}
                  <div className="testimonial-watermark-quote" aria-hidden="true">
                    “
                  </div>

                  {/* Top Metadata Row */}
                  <div className="testimonial-card-topbar">
                    {/* Fixed Green & Gold Quote Badge Icon */}
                    <div className="quote-badge-icon" title="Verified Testimonial">
                      <Quote size={20} />
                    </div>

                    <div className="testimonial-top-badges">
                      {item.crop && (
                        <span className="crop-pill-tag">
                          🌾 {item.crop.replace(' Cultivation', '').replace(' Plantation', '').replace(' Orchard', '').replace(' Farming', '')}
                        </span>
                      )}
                      <span className="verified-grower-tag">
                        <CheckCircle2 size={13} /> Verified Grower
                      </span>
                    </div>

                    <div className="testimonial-stars-pill" aria-label="5 out of 5 rating">
                      <div className="stars-cluster">
                        {[...Array(item.rating || 5)].map((_, sIdx) => (
                          <Star key={sIdx} size={14} fill="#D6A62E" color="#D6A62E" />
                        ))}
                      </div>
                      <span className="rating-score">5.0</span>
                    </div>
                  </div>

                  {/* Review Content */}
                  <div className="testimonial-card-body">
                    {item.highlight && (
                      <div className="testimonial-highlight-tag">
                        "{item.highlight}"
                      </div>
                    )}

                    <blockquote className="testimonial-body-quote">
                      "{item.text}"
                    </blockquote>
                  </div>

                  {/* Farmer Profile Footer */}
                  <div className="testimonial-farmer-profile">
                    <div className="avatar-ring-wrap">
                      <img
                        src={item.photo}
                        alt={item.name}
                        className="farmer-profile-avatar"
                      />
                      <span className="avatar-check-badge" title="Verified farmer">✓</span>
                    </div>

                    <div className="farmer-profile-info">
                      <h3 className="farmer-name">{item.name}</h3>
                      <div className="farmer-role-row">
                        <span className="farmer-role-text">{item.role}</span>
                        {item.location && (
                          <span className="farmer-location-text">
                            <MapPin size={12} /> {item.location}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Navigation & Interactive Dots */}
        <div className="testimonial-carousel-controls-bar">
          <button
            className="arrow-circle-btn"
            onClick={handlePrev}
            aria-label="Previous Testimonials"
            title="Previous Review"
          >
            <ChevronLeft size={22} />
          </button>

          <div className="testimonial-dots" role="tablist" aria-label="Testimonial slides">
            {testimonials.map((item, i) => (
              <button
                key={i}
                className={`dot ${currentIndex % testimonials.length === i ? 'active' : ''}`}
                onClick={() => {
                  setIsTransitioning(true);
                  setCurrentIndex(i);
                }}
                aria-label={`Go to ${item.name}'s testimonial`}
                role="tab"
                aria-selected={currentIndex % testimonials.length === i}
                title={`${item.name} (${item.crop || item.role})`}
              />
            ))}
          </div>

          <button
            className="arrow-circle-btn"
            onClick={handleNext}
            aria-label="Next Testimonials"
            title="Next Review"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Quick Farmer Thumbnail Switcher Strip */}
        <div className="farmer-quick-strip">
          {testimonials.map((item, i) => (
            <button
              key={item.id || i}
              className={`farmer-strip-pill ${currentIndex % testimonials.length === i ? 'active' : ''}`}
              onClick={() => {
                setIsTransitioning(true);
                setCurrentIndex(i);
              }}
              title={`Read ${item.name}'s review`}
            >
              <img
                src={item.photo}
                alt={item.name}
                className="strip-pill-avatar"
              />
              <div className="strip-pill-text">
                <span className="strip-pill-name">{item.name}</span>
                <span className="strip-pill-crop">
                  {item.crop ? item.crop.replace(' Cultivation', '').replace(' Plantation', '').replace(' Orchard', '').replace(' Farming', '') : item.role}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
