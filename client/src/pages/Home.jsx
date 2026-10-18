import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import AgricultureProducts from '../components/AgricultureProducts';
import Gallery from '../components/Gallery';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import FloatingActions from '../components/FloatingActions';
import { settingsService } from '../services/api';

export default function Home() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await settingsService.getPublic();
        if (data) setSettings(data);
      } catch (e) {
        console.error('Settings load error:', e);
      }
    };
    loadSettings();
  }, []);

  return (
    <div className="home-page-root">
      <Navbar settings={settings} />

      <main>
        <Hero settings={settings} />
        <Services settings={settings} />
        <AgricultureProducts settings={settings} />
        <About settings={settings} />
        <Gallery />
        <Testimonials settings={settings} />
        <Contact settings={settings} />
      </main>

      <Footer settings={settings} />
      <FloatingActions settings={settings} />
    </div>
  );
}
