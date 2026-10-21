import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight, Search } from 'lucide-react';
import logo from '../assets/sri-nandi-logo.png';
import { openWhatsApp } from '../utils/whatsapp';

const SEARCH_ITEMS = [
  { title: 'Sugarcane Farming', category: 'Crop Service', url: '/services/sugarcane', desc: 'Guidance on Co 86032, CoM 0265, drip irrigation, IPM and ratoon' },
  { title: 'Banana Farming', category: 'Crop Service', url: '/services/banana', desc: 'Grand Naine G9 tissue culture, bunch management & fertigation' },
  { title: 'Papaya Farming', category: 'Crop Service', url: '/services/papaya', desc: 'Red Lady 786 gynodioecious cultivation, ring irrigation & PRSV defense' },
  { title: 'Watermelon Farming', category: 'Crop Service', url: '/services/watermelon', desc: 'Mulch film, drip fertigation, Kiran & Sugar Baby varieties' },
  { title: 'Power Plant Grow', category: 'Organic Product', url: '/products/grow', desc: 'Bio-stimulant for root and vegetative vigor' },
  { title: 'Power Plant Bloom', category: 'Organic Product', url: '/products/bloom', desc: 'Pollination booster & flowering enhancer' },
  { title: 'Power Plant Fruiter', category: 'Organic Product', url: '/products/fruiter', desc: 'Fruit bulking, brix sweetness & skin firmness' },
  { title: 'Power Plant Potash', category: 'Organic Product', url: '/products/potash', desc: 'Bio-available potassium fertilizer' },
  { title: 'Power Plant Nitro King', category: 'Organic Product', url: '/products/nitro-king', desc: 'Organic nitrogen formulation' },
  { title: 'Power Plant PROM', category: 'Organic Product', url: '/products/prom', desc: 'Phosphate Rich Organic Manure' },
  { title: 'Power Plant Premium', category: 'Organic Product', url: '/products/premium', desc: 'Comprehensive organic nutrition' },
  { title: 'Power Plant ST', category: 'Organic Product', url: '/products/st', desc: 'Organic seed and seedling treatment' },
  { title: 'Power Plant Stress Out', category: 'Organic Product', url: '/products/stress-out', desc: 'Weather stress and drought shield' },
  { title: 'Kaipoi Bhoomi Power', category: 'Organic Product', url: '/products/bhoomi-power', desc: 'Granular soil revitalizer & root stimulant' },
  { title: 'Agro Crop Sudha', category: 'Organic Product', url: '/products/crop-sudha', desc: 'Advanced organic crop booster' },
  { title: 'About Sri Nandi Krishi', category: 'About Us', url: '/about', desc: 'Our mission, heritage, organic farming philosophy and leadership' },
  { title: 'Farmer Photo Gallery', category: 'Gallery', url: '/gallery', desc: 'Authentic harvest photography and field milestones' },
  { title: 'Farmer Testimonials', category: 'Testimonials', url: '/testimonials', desc: 'Verified farmer reviews and yield success stories' },
  { title: 'Contact & WhatsApp Consultation', category: 'Contact', url: '/contact', desc: 'Get in touch, visit our enterprise or book on WhatsApp' }
];

export default function Navbar({ settings }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const whatsappNumber = settings?.whatsappNumber && !settings.whatsappNumber.includes('98765') ? settings.whatsappNumber : '917975305677';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);

      const sections = ['home', 'services', 'products', 'about', 'gallery', 'testimonials', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close search modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const getActiveTab = () => {
    if (location.pathname.startsWith('/services')) return 'services';
    if (location.pathname.startsWith('/products')) return 'products';
    if (location.pathname === '/about') return 'about';
    if (location.pathname === '/gallery') return 'gallery';
    if (location.pathname === '/testimonials') return 'testimonials';
    if (location.pathname === '/contact') return 'contact';
    if (location.pathname === '/') return activeSection || 'home';
    return '';
  };
  const currentActive = getActiveTab();

  const handleBook = () => {
    openWhatsApp('', '', whatsappNumber);
  };

  const filteredSearch = searchQuery.trim()
    ? SEARCH_ITEMS.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.desc.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : SEARCH_ITEMS.slice(0, 7);

  const handleSelectSearchItem = (url) => {
    setSearchOpen(false);
    setSearchQuery('');
    navigate(url);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className={`navbar-wrapper ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="navbar-inner">
            {/* Logo & Brand Name */}
            <Link to="/" className="brand-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <img
                src={logo}
                alt="Sri Nandi Krishi Organic Enterprise Logo"
                className="brand-logo-img"
              />
              <div className="brand-text-wrap">
                <span className="brand-title">SRI NANDI KRISHI</span>
                <span className="brand-subtitle">ORGANIC ENTERPRISE</span>
              </div>
            </Link>

            {/* Navigation Links: Home -> Services -> Products -> About -> Gallery -> Testimonials -> Contact */}
            <nav className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
              <Link
                to="/"
                className={`nav-link ${currentActive === 'home' ? 'active' : ''}`}
                onClick={() => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              >
                Home
              </Link>
              <Link
                to="/services"
                className={`nav-link ${currentActive === 'services' ? 'active' : ''}`}
                onClick={() => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              >
                Services
              </Link>
              <Link
                to="/products"
                className={`nav-link ${currentActive === 'products' ? 'active' : ''}`}
                onClick={() => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              >
                Products
              </Link>
              <Link
                to="/about"
                className={`nav-link ${currentActive === 'about' ? 'active' : ''}`}
                onClick={() => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              >
                About
              </Link>
              <Link
                to="/gallery"
                className={`nav-link ${currentActive === 'gallery' ? 'active' : ''}`}
                onClick={() => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              >
                Gallery
              </Link>
              <Link
                to="/testimonials"
                className={`nav-link ${currentActive === 'testimonials' ? 'active' : ''}`}
                onClick={() => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              >
                Testimonials
              </Link>
              <Link
                to="/contact"
                className={`nav-link ${currentActive === 'contact' ? 'active' : ''}`}
                onClick={() => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              >
                Contact
              </Link>

              {mobileMenuOpen && (
                <button
                  className="btn btn-primary"
                  style={{ width: '100%', marginTop: '12px' }}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleBook();
                  }}
                >
                  Book Consultation <ArrowRight size={16} />
                </button>
              )}
            </nav>

            {/* Right Action Icons & Direct WhatsApp Book Consultation Button */}
            <div className="nav-actions">
              <button
                className="btn btn-primary nav-book-btn"
                onClick={handleBook}
                title="Book Consultation directly on WhatsApp"
              >
                <span>Book Consultation</span>
                <ArrowRight size={16} />
              </button>

              {/* Working Search Button */}
              <button
                className="nav-icon-btn"
                aria-label="Search crops and products"
                title="Search crops, products & services"
                onClick={() => setSearchOpen(true)}
              >
                <Search size={18} />
              </button>

              <button
                className="mobile-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Interactive Quick Search Modal */}
      {searchOpen && (
        <div className="nav-search-overlay" onClick={() => setSearchOpen(false)}>
          <div className="nav-search-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="nav-search-header">
              <Search size={20} />
              <input
                type="text"
                className="nav-search-input"
                placeholder="Search crops, services, organic products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button
                type="button"
                className="nav-search-close"
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
              >
                <X size={20} />
              </button>
            </div>

            <div className="nav-search-results">
              {filteredSearch.length > 0 ? (
                filteredSearch.map((item, idx) => (
                  <div
                    key={idx}
                    className="nav-search-item"
                    onClick={() => handleSelectSearchItem(item.url)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="nav-search-item-info">
                      <span className="nav-search-item-title">{item.title}</span>
                      <span className="nav-search-item-desc">{item.desc}</span>
                    </div>
                    <span className="nav-search-item-tag">{item.category}</span>
                  </div>
                ))
              ) : (
                <div className="nav-search-empty">
                  No crops or products matched "{searchQuery}". Try searching for sugarcane, banana, bloom, or fruiter.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
