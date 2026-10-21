import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Leaf,
  Sprout,
  Recycle,
  HeartHandshake,
  TrendingUp,
  Award,
  ShieldCheck,
  Droplets,
  Clock,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  X,
  CheckCircle2,
  Check,
  ExternalLink
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { openWhatsApp } from '../utils/whatsapp';
import './OrganicProductsSlider.css';

// Photography Assets
import bannerShowcaseImg from '../assets/organic-products-banner.png';
import sugarcaneFieldImg from '../assets/sugarcane-field.jpg';
import bananaImg from '../assets/banana.jpg';
import papayaImg from '../assets/papaya.jpg';
import watermelonImg from '../assets/watermelon.jpg';

// Uploaded HD 3D Product Assets
import productGrowImg from '../assets/hd-power-plant-grow.jpg';
import productNitroKingImg from '../assets/hd-power-plant-nitro-king.jpg';
import productBloomImg from '../assets/hd-power-plant-bloom.jpg';
import productFruiterImg from '../assets/hd-power-plant-fruiter.jpg';
import productStImg from '../assets/hd-power-plant-st.jpg';
import productPromImg from '../assets/hd-power-plant-prom.jpg';
import productPotashImg from '../assets/hd-power-plant-potash.jpg';
import productPremiumImg from '../assets/hd-power-plant-premium.jpg';
import productStressOutImg from '../assets/hd-power-plant-stress-out.jpg';
import productAgroSudhaImg from '../assets/hd-agro-crop-sudha.jpg';
import productBhoomiPowerImg from '../assets/hd-kaipoi-bhoomi-power.jpg';
import bananaBunchImg from '../assets/banana-bunch.jpg';
import papayaTreeImg from '../assets/papaya-tree.jpg';

// Catalog of Organic Products
export const ORGANIC_PRODUCTS_CATALOG = [
  {
    id: 'prom',
    name: 'Power Plant PROM',
    subtitle: 'Phosphate Rich Organic Manure',
    category: 'fertilizer',
    categoryLabel: 'Organic Fertilizer',
    netContent: '50 Kg Bag',
    image: productPromImg,
    badge: '100% Organic Manure',
    description:
      'High-grade organic phosphorus alternative to chemical DAP, enriched with biological carbon and rock phosphate to nourish soil microflora.',
    highlights: [
      'Improves soil humus & biological phosphorus absorption',
      'Prevents phosphate fixation in acidic/alkaline soils',
      'Promotes robust root branching & seedling vigor',
      'Certified organic input for eco-friendly farming'
    ]
  },
  {
    id: 'potash',
    name: 'Power Plant Potash',
    subtitle: 'Bio-Available Organic Fertilizer',
    category: 'fertilizer',
    categoryLabel: 'Organic Fertilizer',
    netContent: '50 Kg Bag',
    image: productPotashImg,
    badge: 'High Potassium Source',
    description:
      'Eco-friendly organic potash that strengthens plant stems, elevates sucrose brix in sugarcane, and improves bunch density in banana.',
    highlights: [
      'Naturally derived potassium for rapid translocation',
      'Increases crop resistance to drought & heat stress',
      'Significantly improves fruit size, shine, and weight',
      'Safe for soil microbes and earthworms'
    ]
  },
  {
    id: 'bhoomi-power',
    name: 'Kaipoi Bhoomi Power',
    subtitle: 'Granular Soil Rejuvenator & Conditioner',
    category: 'fertilizer',
    categoryLabel: 'Soil Conditioner',
    netContent: '4 Kg Granular Pack',
    image: productBhoomiPowerImg,
    badge: 'Multi-Nutrient Soil Food',
    description:
      'Granular organic soil energizer enriched with humic fractions, mycorrhiza, and vital micronutrients for complete crop development.',
    highlights: [
      'Unlocks unavailable locked nutrients in hard soil',
      'Boosts soil water retention and aeration',
      'Stimulates beneficial microbial colonies',
      'Ideal basal mix for Sugarcane, Banana, & Melons'
    ]
  },
  {
    id: 'premium',
    name: 'Power Plant Premium',
    subtitle: 'Bio-Stimulant Tonic Bottle',
    category: 'biostimulant',
    categoryLabel: 'Bio-Stimulant',
    netContent: '1000 ml Bottle',
    image: productPremiumImg,
    badge: 'Cellular Growth Booster',
    description:
      'Concentrated bio-stimulant solution formulated with ocean algae and humic acid to energize active crop metabolism and stress recovery.',
    highlights: [
      'Triggers cellular multiplication and lush canopy',
      'Accelerates vegetative shoots and internode girth',
      'Enhances photosynthetic chlorophyll levels',
      'Suitable for foliar spray and fertigation'
    ]
  },
  {
    id: 'stress-out',
    name: 'Power Plant Stress Out',
    subtitle: 'Anti-Stress Crop Shield Bio-Stimulant',
    category: 'biostimulant',
    categoryLabel: 'Crop Protection Shield',
    netContent: '1000 ml Bottle',
    image: productStressOutImg,
    badge: 'Abiotic Stress Shield',
    description:
      'Protective shield for crops against climate uncertainties, moisture stress, extreme heat, cold spells, and chemical shock.',
    highlights: [
      'Enhances physiological tolerance against drought and heat',
      'Activates plant antioxidant defense enzymes',
      'Reduces leaf scorching and wilting during dry spells',
      'Promotes rapid recovery from adverse weather shock'
    ]
  },
  {
    id: 'agro-crop-sudha',
    name: 'Agro Crop Sudha',
    subtitle: 'Plant Growth Promoter & Immunity Booster',
    category: 'biostimulant',
    categoryLabel: 'Growth Promoter',
    netContent: '1000 ml Bottle',
    image: productAgroSudhaImg,
    badge: 'Immunity Booster',
    description:
      'Herbal plant growth promoter engineered to stimulate vegetative flushes, fortify systemic disease resistance, and increase harvest tonnage.',
    highlights: [
      'Boosts natural plant immune resistance against pathogens',
      'Stimulates dark green chlorophyll biosynthesis',
      'Enhances vegetative branch nodes and flower clusters',
      'Eco-friendly and certified for organic production'
    ]
  },
  {
    id: 'grow',
    name: 'Power Plant GROW',
    subtitle: 'Soil Fertility & Plant Growth Bio-Stimulant',
    category: 'biostimulant',
    categoryLabel: 'Bio-Stimulant',
    netContent: '1000 ml Bottle',
    image: productGrowImg,
    badge: 'Humic & Seaweed Formula',
    description:
      'Fortified bio-stimulant rich in humic acid, seaweed extract, amino acids, and vitamins for vibrant soil fertility and plant expansion.',
    highlights: [
      'Stimulates white feeder root proliferation',
      'Optimizes nutrient uptake through root zone',
      'Improves vegetative tillering in sugarcane & banana',
      'Fortified with trace minerals and growth boosters'
    ]
  },
  {
    id: 'nitro-king',
    name: 'Power Plant Nitro King',
    subtitle: 'Seaweed Extract & Amino Acid Bio-Stimulant',
    category: 'biostimulant',
    categoryLabel: 'Bio-Stimulant',
    netContent: '1000 ml Bottle',
    image: productNitroKingImg,
    badge: 'Chlorophyll Energizer',
    description:
      'Rapid-action organic foliage tonic providing free amino acids and marine seaweed extract to ignite photosynthesis and green leaf area.',
    highlights: [
      'Supplies bio-available organic nitrogen & peptides',
      'Prevents yellowing and vegetative stagnation',
      'Enhances canopy density and solar light absorption',
      'Safe, non-toxic, and non-burning formulation'
    ]
  },
  {
    id: 'bloom',
    name: 'Power Plant Bloom',
    subtitle: 'Flower Bud & Inflorescence Bio-Stimulant',
    category: 'biostimulant',
    categoryLabel: 'Bio-Stimulant',
    netContent: '1000 ml Bottle',
    image: productBloomImg,
    badge: 'Profuse Flowering Shield',
    description:
      'Specialized botanical bio-stimulant formulated to stimulate profuse flowering, enhance blossom retention, and prevent drop in fruit crops.',
    highlights: [
      'Promotes uniform and synchronized flowering',
      'Significantly minimizes flower and early bud shed',
      'Enhances female flower ratio in melons & papaya',
      'Strengthens flower pedicel attachment'
    ]
  },
  {
    id: 'fruiter',
    name: 'Power Plant Fruiter',
    subtitle: 'Advanced Bio-Stimulator for Fruit Setting',
    category: 'biostimulant',
    categoryLabel: 'Bio-Stimulator',
    netContent: '1000 ml Bottle',
    image: productFruiterImg,
    badge: 'Fruit Set & Vigour',
    description:
      'Advanced bio-stimulator designed to enhance pollen germination, successful fertilization, rapid fruit set, and uniform fruit enlargement.',
    highlights: [
      'Accelerates pollen germination and fruit set',
      'Maximizes fruit weight, circumference, and pulp density',
      'Enhances natural fruit color, gloss, and sweetness',
      'Reduces fruit cracking and physiological drop'
    ]
  },
  {
    id: 'st',
    name: 'Power Plant ST',
    subtitle: 'Humic Acid 5% Bio-Stimulant for Seed & Sett',
    category: 'biostimulant',
    categoryLabel: 'Bio-Stimulant',
    netContent: '1000 ml Bottle',
    image: productStImg,
    badge: 'Seed & Sett Treatment',
    description:
      'Specialized 5% humic acid formulation crafted for seed soaking and sugarcane sett treatment to ensure rapid, uniform field establishment.',
    highlights: [
      'Breaks seed and cane bud dormancy rapidly',
      'Accelerates initial radicle and plumule emergence',
      'Protects young seedlings against soil-borne damping',
      'Ensures uniform, high-percentage field germination'
    ]
  }
];

export default function OrganicProductsSlider({ settings }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const whatsappNumber = settings?.whatsappNumber && !settings.whatsappNumber.includes('98765') ? settings.whatsappNumber : '917975305677';

  // Check accessibility reduced-motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  // Slide Definitions
  const slides = [
    {
      id: 'fertilizers',
      badgeText: '100% Organic Farming Solutions',
      titleLine1: 'Organic Nutrition',
      titleLine2: 'for Brighter Farms',
      description:
        'Premium organic fertilizers to improve soil health, boost crop growth and support sustainable farming.',
      benefits: [
        { label: 'Rich Soil Nutrition', icon: Leaf },
        { label: 'Healthy Crop Growth', icon: Sprout },
        { label: 'Chemical-Free Farming', icon: Recycle },
        { label: 'Sustainable Agriculture', icon: HeartHandshake }
      ],
      buttonText: 'Explore Organic Products',
      isProductsTrigger: true,
      visualType: 'product-showcase',
      image: bannerShowcaseImg,
      floatingBadge: 'Natural Organic Farming',
      scriptTag: 'Healthy Crops Happier Tomorrow'
    },
    {
      id: 'sugarcane',
      badgeText: 'High Yield & Sugar Recovery',
      titleLine1: 'Sugarcane Cultivation',
      titleLine2: 'for Maximum Tonnage',
      description:
        'Scientific sett bio-treatment, balanced organic nutrient schedules, and borer management for superior cane girth and sugar recovery.',
      benefits: [
        { label: 'High Sugar Brix (18–20°)', icon: TrendingUp },
        { label: 'Vigorous Tillering', icon: Sprout },
        { label: 'Red Rot & Borer Shield', icon: ShieldCheck },
        { label: 'Profitable Ratoon Crops', icon: Award }
      ],
      buttonText: 'Explore Sugarcane Guidance',
      linkUrl: '/services/sugarcane',
      visualType: 'crop-showcase',
      image: sugarcaneFieldImg,
      floatingBadge: 'Sugarcane Farming Support',
      statTitle: 'Target Field Tonnage',
      statValue: '65–85 Tons / Acre'
    },
    {
      id: 'banana-papaya',
      badgeText: 'Export-Grade Commercial Fruits',
      titleLine1: 'Banana & Papaya Farming',
      titleLine2: 'for Premium Harvests',
      description:
        'Secondary hardened tissue culture guidance, paired-row pit preparation, bunch sleeving, and biological disease prevention.',
      benefits: [
        { label: 'Heavy Bunch (28–36 kg)', icon: Award },
        { label: 'Spot-Free Export Quality', icon: ShieldCheck },
        { label: 'Red Lady 786 Bed Protocol', icon: Sprout },
        { label: 'Post-Harvest Guidance', icon: CheckCircle2 }
      ],
      buttonText: 'Explore Banana & Papaya Guidance',
      linkUrl: '/services/banana',
      visualType: 'crop-showcase',
      image: bananaBunchImg,
      floatingBadge: 'Commercial Fruit Orchards',
      statTitle: 'High-Density Planting',
      statValue: '1,200 Tissue Culture Plants/Acre'
    },
    {
      id: 'watermelon',
      badgeText: 'Crisp High-Brix Yields',
      titleLine1: 'Watermelon Farming',
      titleLine2: 'for Maximum Profit',
      description:
        'High-density inline drip fertigation, silver-black mulching setup, uniform fruit setting, and brix optimization for rapid 75-day turnaround.',
      benefits: [
        { label: 'High Sugar Brix (12–14°)', icon: TrendingUp },
        { label: 'Uniform 3–5 kg Sizing', icon: Award },
        { label: 'Fusarium Wilt Bio-Shield', icon: ShieldCheck },
        { label: 'Fast 75–85 Day Harvest', icon: Clock }
      ],
      buttonText: 'Explore Watermelon Guidance',
      linkUrl: '/services/watermelon',
      visualType: 'crop-showcase',
      image: watermelonImg,
      floatingBadge: 'Short-Cycle Cash Crop',
      statTitle: 'Average Crop Duration',
      statValue: '75 – 85 Days from Sowing'
    }
  ];

  // Auto-Slider Timer (5 Seconds)
  useEffect(() => {
    if (isPaused || isModalOpen) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, isModalOpen, slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const current = slides[currentSlide];

  // Filter products for modal
  const filteredProducts = ORGANIC_PRODUCTS_CATALOG.filter((prod) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'fertilizers') return prod.category === 'fertilizer';
    if (activeTab === 'biostimulants') return prod.category === 'biostimulant';
    return true;
  });

  const handleEnquireProduct = (productName) => {
    const msg = `Hello Sri Nandi Krishi Organic Enterprise, I am interested in ${productName} for my farm. Please share dosage guidelines and availability.`;
    openWhatsApp('', msg, whatsappNumber);
  };

  return (
    <section
      className="organic-slider-section"
      id="organic-products"
      aria-label="Organic Farming Solutions and Crop Guidance"
    >
      <div className="organic-slider-container">
        <div
          className="organic-slider-card"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Ambient Lighting & Glow */}
          <div className="slider-bg-ambient" aria-hidden="true" />

          {/* Floating Leaves Decoration */}
          <div className="floating-leaf floating-leaf-1" aria-hidden="true">
            <svg viewBox="0 0 100 100" fill="#D9A72E">
              <path d="M10,90 Q30,40 80,10 Q90,60 50,85 Z" />
            </svg>
          </div>
          <div className="floating-leaf floating-leaf-2" aria-hidden="true">
            <svg viewBox="0 0 100 100" fill="#F8F6EC">
              <path d="M15,85 Q40,30 90,15 Q80,75 35,90 Z" />
            </svg>
          </div>
          <div className="floating-leaf floating-leaf-3" aria-hidden="true">
            <svg viewBox="0 0 100 100" fill="#D9A72E">
              <path d="M10,80 Q25,25 85,20 Q70,70 30,85 Z" />
            </svg>
          </div>

          {/* Left Arrow Button */}
          <button
            type="button"
            className="slider-arrow-btn slider-arrow-prev"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            className="slider-arrow-btn slider-arrow-next"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <ChevronRight size={22} />
          </button>

          {/* Slide Content with Smooth Transition */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              className="slide-content-grid"
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              {/* Left Column: Text & Benefits */}
              <div className="slide-text-col">
                <div className="slide-badge-pill">
                  <Sparkles size={14} className="slide-badge-icon" />
                  <span>{current.badgeText}</span>
                </div>

                <h2 className="slide-main-title">
                  {current.titleLine1}
                  <span className="gold-accent">{current.titleLine2}</span>
                </h2>

                <p className="slide-description">{current.description}</p>

                {/* 4 Compact Benefits */}
                <div className="slide-benefits-row">
                  {current.benefits.map((b, idx) => {
                    const BenefitIcon = b.icon;
                    return (
                      <div className="benefit-pill-item" key={idx}>
                        <div className="benefit-icon-circle">
                          <BenefitIcon size={18} />
                        </div>
                        <span className="benefit-label">{b.label}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Prominent Action Button */}
                {current.isProductsTrigger ? (
                  <button
                    type="button"
                    className="slide-cta-btn"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <span>{current.buttonText}</span>
                    <ArrowRight size={18} />
                  </button>
                ) : (
                  <Link to={current.linkUrl} className="slide-cta-btn">
                    <span>{current.buttonText}</span>
                    <ArrowRight size={18} />
                  </Link>
                )}
              </div>

              {/* Right Column: Visual Showcase */}
              <div className="slide-visual-col">
                {current.visualType === 'product-showcase' ? (
                  <div className="product-showcase-frame">
                    <img
                      src={current.image}
                      alt="Power Plant Organic Fertilizers and Bio-Stimulants"
                      className="product-showcase-img"
                    />
                    <div className="visual-floating-badge">
                      <Leaf size={13} />
                      <span>{current.floatingBadge}</span>
                    </div>
                    <div className="visual-script-tag">{current.scriptTag}</div>
                  </div>
                ) : (
                  <div className="crop-photo-frame">
                    <img
                      src={current.image}
                      alt={`${current.titleLine1} field`}
                      className="crop-photo-img"
                    />
                    <div className="visual-floating-badge">
                      <Sparkles size={13} />
                      <span>{current.floatingBadge}</span>
                    </div>
                    <div className="crop-stat-overlay">
                      <span className="crop-stat-title">{current.statTitle}</span>
                      <span className="crop-stat-val">{current.statValue}</span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom Ribbon: 4 Soil & Farming Pillars */}
          <div className="slider-bottom-strip" aria-hidden="true">
            <div className="strip-item">
              <span className="strip-icon">
                <Leaf size={15} />
              </span>
              <span>Improves Soil Fertility</span>
            </div>
            <div className="strip-item">
              <span className="strip-icon">
                <Sprout size={15} />
              </span>
              <span>Better Root Development</span>
            </div>
            <div className="strip-item">
              <span className="strip-icon">
                <Sparkles size={15} />
              </span>
              <span>Healthier Crop Quality</span>
            </div>
            <div className="strip-item">
              <span className="strip-icon">
                <Recycle size={15} />
              </span>
              <span>Supports Sustainable Agriculture</span>
            </div>
          </div>

          {/* Pagination Indicators (4 Dots) */}
          <div className="slider-dots-wrap" role="tablist" aria-label="Slider pagination">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={idx === currentSlide}
                aria-label={`Go to slide ${idx + 1}: ${s.titleLine1}`}
                className={`slider-dot-btn ${idx === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(idx)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Organic Products Showcase Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div
            className="organic-modal-overlay"
            onClick={() => setIsModalOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="organic-modal-heading"
          >
            <motion.div
              className="organic-modal-dialog"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
            >
              {/* Modal Header */}
              <div className="organic-modal-header">
                <div className="organic-modal-header-info">
                  <h3 id="organic-modal-heading">Organic Agricultural Solutions</h3>
                  <p>Certified bio-stimulants, organic manure, and soil conditioners</p>
                </div>
                <button
                  type="button"
                  className="organic-modal-close-btn"
                  onClick={() => setIsModalOpen(false)}
                  aria-label="Close product catalogue"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Filter Tabs */}
              <div className="organic-modal-tabs">
                <button
                  type="button"
                  className={`modal-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                  onClick={() => setActiveTab('all')}
                >
                  All Products ({ORGANIC_PRODUCTS_CATALOG.length})
                </button>
                <button
                  type="button"
                  className={`modal-tab-btn ${activeTab === 'fertilizers' ? 'active' : ''}`}
                  onClick={() => setActiveTab('fertilizers')}
                >
                  Organic Fertilizers & Manure ({ORGANIC_PRODUCTS_CATALOG.filter(p => p.category === 'fertilizer').length})
                </button>
                <button
                  type="button"
                  className={`modal-tab-btn ${activeTab === 'biostimulants' ? 'active' : ''}`}
                  onClick={() => setActiveTab('biostimulants')}
                >
                  Bio-Stimulants & Tonics ({ORGANIC_PRODUCTS_CATALOG.filter(p => p.category === 'biostimulant').length})
                </button>
              </div>

              {/* Product Grid */}
              <div className="organic-modal-body">
                {filteredProducts.map((prod) => (
                  <article key={prod.id} className="modal-product-card">
                    <div>
                      <div className="modal-product-img-wrap">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="modal-product-img"
                          loading="lazy"
                        />
                      </div>
                      <span className="modal-product-badge">{prod.badge}</span>
                      <h4 className="modal-product-title">{prod.name}</h4>
                      <div className="modal-product-pack">{prod.netContent}</div>
                      <p className="modal-product-desc">{prod.description}</p>
                      <ul className="modal-product-highlights">
                        {prod.highlights.map((h, i) => (
                          <li key={i}>
                            <Check size={14} />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      type="button"
                      className="modal-enquire-btn"
                      onClick={() => handleEnquireProduct(prod.name)}
                    >
                      <FaWhatsapp size={16} />
                      <span>Enquire on WhatsApp</span>
                    </button>
                  </article>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
