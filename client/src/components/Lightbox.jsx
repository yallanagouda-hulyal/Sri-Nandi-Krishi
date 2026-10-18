import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Lightbox({ image, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!image) return null;

  return (
    <div
      className="lightbox-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="lightbox-close"
          onClick={onClose}
          aria-label="Close Lightbox"
        >
          <X size={32} />
        </button>

        <img
          src={image.imageUrl}
          alt={image.title || 'Sri Nandi Krishi Agricultural Gallery'}
          className="lightbox-img"
        />

        <div className="lightbox-caption">
          <b style={{ display: 'block', fontSize: '18px', color: '#E3B341', marginBottom: '4px' }}>
            {image.title}
          </b>
          {image.caption && <span>{image.caption}</span>}
        </div>
      </div>
    </div>
  );
}
