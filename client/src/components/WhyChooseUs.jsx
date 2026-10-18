import React from 'react';
import { motion } from 'framer-motion';
import { Sprout, Compass, ShieldCheck, MessageCircle, Layers } from 'lucide-react';

export default function WhyChooseUs() {
  const cards = [
    {
      icon: Compass,
      title: 'Practical Agricultural Guidance',
      desc: 'Real, field-tested advice that considers your local soil, irrigation facilities, and seasonal conditions rather than generic theoretical tips.'
    },
    {
      icon: Layers,
      title: 'Crop-Specific Support',
      desc: 'Deep focus on Sugarcane, Banana, Papaya, and Watermelon cultivation, ensuring precision advice for every vegetative and fruiting stage.'
    },
    {
      icon: MessageCircle,
      title: 'Farmer-Friendly Communication',
      desc: 'Accessible, supportive interaction in simple, clear language with fast communication through WhatsApp and telephone consultations.'
    },
    {
      icon: ShieldCheck,
      title: 'Cultivation Planning Assistance',
      desc: 'Comprehensive roadmaps covering land tillage, nursery preparation, nutrient scheduling, pest scouting, and harvest timing.'
    }
  ];

  return (
    <section className="why-choose-section" id="why-choose-us">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Sprout size={15} />
            <span>Why Farmers Trust Us</span>
          </div>

          <h2 className="section-title">
            Committed to <em>Your Farm's Growth</em>
          </h2>

          <p className="section-subtitle">
            We partner with growers to foster resilient crops, healthier soils, and sustainable yields through proven organic practices.
          </p>
        </div>

        <div className="why-cards-grid">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={idx}
                className="why-card"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="why-icon-box">
                  <Icon size={24} />
                </div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
