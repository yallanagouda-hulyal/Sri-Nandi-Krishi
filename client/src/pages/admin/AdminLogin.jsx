import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LockKeyhole, Mail, ArrowUpRight, ArrowLeft, AlertCircle } from 'lucide-react';
import logo from '../../assets/sri-nandi-logo.png';
import { authService } from '../../services/api';
import '../../admin.css';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.login(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid administrator email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card">
        <img
          src={logo}
          alt="Sri Nandi Krishi Organic Enterprise Logo"
          className="admin-login-logo"
        />

        <h1 className="admin-login-title">Admin Login</h1>
        <p className="admin-login-desc">
          Access your dashboard
        </p>

        {error && (
          <div style={{
            background: '#ffebee',
            color: '#c62828',
            padding: '12px',
            borderRadius: '8px',
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '18px',
            textAlign: 'left'
          }}>
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="admin-form-group">
            <label className="admin-form-label">Email Address</label>
            <input
              type="email"
              required
              placeholder="Enter admin email"
              className="admin-form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Password</label>
            <input
              type="password"
              required
              placeholder="Enter password"
              className="admin-form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="admin-btn-primary"
          >
            {loading ? 'Authenticating...' : 'Login →'}
          </button>
        </form>

        <Link to="/" className="admin-back-link">
          ← Return to Public Website
        </Link>
      </div>
    </div>
  );
}
