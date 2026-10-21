import React from 'react';
import { Phone } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import Chatbot from './Chatbot';

export default function FloatingActions({ settings }) {
  const phone = settings?.phone && !settings.phone.includes('98765') ? settings.phone : '+91 79753 05677';
  const whatsappNumber = settings?.whatsappNumber && !settings.whatsappNumber.includes('98765') ? settings.whatsappNumber : '917975305677';
  const telHref = phone ? `tel:${phone.replace(/[^0-9+]/g, '')}` : '#';
  const waUrl = buildWhatsAppUrl('', '', whatsappNumber);

  return (
    <>
      {/* Bottom-Left Chatbot Widget ("Ask Krishi") */}
      <Chatbot whatsappNumber={whatsappNumber} />

      {/* Bottom-Right Floating Action Buttons: WhatsApp on top, Call below */}
      <aside className="floating-actions-bottom-right" aria-label="Quick Contact Actions">
        {/* 1. WhatsApp Button (Green) - Stacked on top */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="float-action-btn float-btn-wa"
          aria-label="Chat with Sri Nandi Krishi on WhatsApp"
          title="Chat on WhatsApp"
        >
          <FaWhatsapp size={26} />
          <span className="float-btn-tooltip">Chat on WhatsApp</span>
        </a>

        {/* 2. Call Button (Gold) - Stacked below WhatsApp */}
        {phone && !phone.includes('XXXX') && (
          <a
            href={telHref}
            className="float-action-btn float-btn-call"
            aria-label={`Call Sri Nandi Krishi at ${phone}`}
            title={`Call: ${phone}`}
          >
            <Phone size={22} />
            <span className="float-btn-tooltip">Call: {phone}</span>
          </a>
        )}
      </aside>
    </>
  );
}

