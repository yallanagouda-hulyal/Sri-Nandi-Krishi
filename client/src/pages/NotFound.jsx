import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, ArrowLeft } from 'lucide-react';
import logo from '../assets/sri-nandi-logo.png';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#FAF9F2',
      padding: '24px',
      textAlign: 'center'
    }}>
      <img
        src={logo}
        alt="Sri Nandi Krishi Organic Enterprise"
        style={{ width: '80px', height: '80px', borderRadius: '50%', marginBottom: '20px', border: '2px solid #E3B341', padding: '4px', background: '#fff' }}
      />
      <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '54px', color: '#124B2A', marginBottom: '8px' }}>
        404
      </h1>
      <h2 style={{ fontSize: '22px', color: '#124B2A', marginBottom: '14px' }}>
        Page Not Found
      </h2>
      <p style={{ maxWidth: '420px', color: '#586B60', fontSize: '14px', lineHeight: '1.7', marginBottom: '28px' }}>
        The agricultural guidance page or resource you are looking for does not exist or may have been moved.
      </p>
      <Link to="/" className="btn btn-primary">
        <ArrowLeft size={16} />
        <span>Return to Homepage</span>
      </Link>
    </div>
  );
}
