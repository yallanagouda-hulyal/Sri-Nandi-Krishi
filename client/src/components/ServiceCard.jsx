import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { openWhatsApp } from '../utils/whatsapp';

export default function ServiceCard({ service, whatsappNumber }) {
  const { slug, name, cropName, cardImage, highlights } = service;
  const targetSlug = slug || (cropName || name || '').toLowerCase().replace(/\s+/g, '-');

  const handleBook = () => {
    openWhatsApp(cropName || name, '', whatsappNumber);
  };

  return (
    <article className="our-services-card">
      <Link to={`/services/${targetSlug}`} className="services-card-img-wrap" title={`View details for ${name}`}>
        <img
          src={cardImage}
          alt={`${name} agricultural guidance`}
          className="services-card-img"
          loading="lazy"
        />
      </Link>

      <div className="services-card-body">
        <h3 className="services-card-title">
          <Link to={`/services/${targetSlug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
            {name}
          </Link>
        </h3>

        {highlights && highlights.length > 0 && (
          <ul className="services-card-checklist">
            {highlights.map((item, idx) => (
              <li key={idx}>
                <span className="check-dot">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        <Link
          to={`/services/${targetSlug}`}
          className="btn-services-details"
          title={`View Details for ${name}`}
        >
          <span>View Details</span>
          <ArrowRight size={15} />
        </Link>

        <button
          className="btn-services-book"
          onClick={handleBook}
          title={`Book Consultation for ${name} via WhatsApp`}
        >
          <span>Book Consultation</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </article>
  );
}
