import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingActions from '../components/FloatingActions';
import Testimonials from '../components/Testimonials';
import { settingsService, DEFAULT_SETTINGS } from '../services/api';

export default function TestimonialsPage() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    settingsService
      .getPublic()
      .then((data) => {
        if (data) setSettings(data);
      })
      .catch(() => {
        setSettings(DEFAULT_SETTINGS);
      });
  }, []);

  return (
    <div className="testimonials-page-root">
      <Navbar settings={settings} />

      <main className="page-main-content">
        <div className="container" style={{ paddingTop: '28px' }}>
          <div className="page-breadcrumb">
            <Link to="/">Home</Link>
            <span className="sep">&gt;</span>
            <span className="active">Farmer Testimonials</span>
          </div>
        </div>

        {/* 3-Card Multi-Review Auto-Scrolling Showcase */}
        <Testimonials settings={settings} />
      </main>

      <Footer settings={settings} />
      <FloatingActions settings={settings} />
    </div>
  );
}
