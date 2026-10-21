import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingActions from '../components/FloatingActions';
import Contact from '../components/Contact';
import { settingsService, DEFAULT_SETTINGS } from '../services/api';

export default function ContactPage() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    settingsService.getPublic().then((data) => {
      if (data) setSettings(data);
    }).catch(() => {
      setSettings(DEFAULT_SETTINGS);
    });
  }, []);

  return (
    <div className="contact-page-root">
      <Navbar settings={settings} />

      <main className="page-main-content">
        <div className="container" style={{ paddingTop: '20px' }}>
          {/* Breadcrumb */}
          <div className="page-breadcrumb">
            <span>Home</span>
            <span className="sep">&gt;</span>
            <span className="active">Contact</span>
          </div>
        </div>

        <Contact settings={settings} />
      </main>

      <Footer settings={settings} />
      <FloatingActions settings={settings} />
    </div>
  );
}
