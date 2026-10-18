import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarCheck,
  Package,
  Image as ImageIcon,
  MessageSquare,
  Mail,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Sprout,
  Users,
  CheckCircle2,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import logo from '../../assets/sri-nandi-logo.png';
import { authService, bookingService, cropService, galleryService, testimonialService, contactService } from '../../services/api';
import BookingsManager from './BookingsManager';
import ServicesManager from './ServicesManager';
import GalleryManager from './GalleryManager';
import TestimonialsManager from './TestimonialsManager';
import MessagesManager from './MessagesManager';
import SettingsManager from './SettingsManager';
import '../../admin.css';

export default function AdminDashboard({ initialTab = 'Overview' }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [stats, setStats] = useState({
    totalBookings: 0,
    newBookings: 0,
    servicesCount: 4,
    galleryCount: 8,
    messagesCount: 0
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [loadingOverview, setLoadingOverview] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/admin/login');
      return;
    }
    loadOverviewData();
  }, [navigate]);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 3500);
  };

  const loadOverviewData = async () => {
    setLoadingOverview(true);
    try {
      const [bookings, services, gallery, messages] = await Promise.allSettled([
        bookingService.getAll(),
        cropService.getAll(),
        galleryService.getAll(),
        contactService.getAll()
      ]);

      const allBookings = bookings.status === 'fulfilled' ? bookings.value : [];
      const allServices = services.status === 'fulfilled' ? services.value : [];
      const allGallery = gallery.status === 'fulfilled' ? gallery.value : [];
      const allMessages = messages.status === 'fulfilled' ? messages.value : [];

      setStats({
        totalBookings: allBookings.length,
        newBookings: allBookings.filter(b => b.status === 'New').length,
        servicesCount: allServices.length || 4,
        galleryCount: allGallery.length || 8,
        messagesCount: allMessages.length
      });

      setRecentBookings(allBookings.slice(0, 5));
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingOverview(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Overview', icon: LayoutDashboard },
    { name: 'Crop Services', icon: Package },
    { name: 'Consultation Bookings', icon: CalendarCheck, badge: stats.newBookings },
    { name: 'Gallery Management', icon: ImageIcon },
    { name: 'Testimonials', icon: MessageSquare },
    { name: 'Contact Messages', icon: Mail },
    { name: 'Website Settings', icon: Settings },
  ];

  return (
    <div className="admin-layout-root">
      {/* Toast Alert */}
      {toast.show && (
        <div className={`admin-toast ${toast.type}`}>
          {toast.message}
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className={`admin-sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="admin-sidebar-header">
          <img
            src={logo}
            alt="Sri Nandi Krishi"
            className="admin-sidebar-logo"
          />
          <div className="admin-sidebar-brand">
            Sri Nandi Krishi
            <small>Admin Studio</small>
          </div>
        </div>

        <nav className="admin-nav-menu">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;
            return (
              <button
                key={item.name}
                className={`admin-nav-btn ${isActive ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab(item.name);
                  setMobileMenuOpen(false);
                }}
              >
                <Icon size={17} />
                <span style={{ flex: 1 }}>{item.name}</span>
                {item.badge > 0 && (
                  <span style={{
                    background: '#E3B341',
                    color: '#124B2A',
                    fontSize: '11px',
                    fontWeight: '700',
                    padding: '2px 7px',
                    borderRadius: '10px'
                  }}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="admin-sidebar-footer">
          <button className="admin-logout-btn" onClick={handleLogout}>
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="admin-main-wrap">
        {/* Top Header */}
        <header className="admin-top-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'none' }}
              className="mobile-toggle"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div className="admin-breadcrumbs">
              Workspace / <b>{activeTab}</b>
            </div>
          </div>

          <div className="admin-top-actions">
            <Link to="/" target="_blank" className="btn-view-site">
              <span>View Website</span>
              <ExternalLink size={13} />
            </Link>

            <div className="admin-user-pill">
              <Sprout size={15} color="#124B2A" />
              <span>Admin</span>
            </div>
          </div>
        </header>

        {/* Dynamic Body Component */}
        <div className="admin-body-area">
          {activeTab === 'Overview' && (
            <div>
              {/* Metrics Stats */}
              <div className="admin-stats-grid">
                <div className="admin-stat-card">
                  <div className="stat-card-info">
                    <span>Total Bookings</span>
                    <b>{stats.totalBookings}</b>
                  </div>
                  <div className="stat-card-icon green">
                    <CalendarCheck size={22} />
                  </div>
                </div>

                <div className="admin-stat-card">
                  <div className="stat-card-info">
                    <span>New Consultations</span>
                    <b>{stats.newBookings}</b>
                  </div>
                  <div className="stat-card-icon gold">
                    <Clock size={22} />
                  </div>
                </div>

                <div className="admin-stat-card">
                  <div className="stat-card-info">
                    <span>Crop Guidance Services</span>
                    <b>{stats.servicesCount}</b>
                  </div>
                  <div className="stat-card-icon blue">
                    <Package size={22} />
                  </div>
                </div>

                <div className="admin-stat-card">
                  <div className="stat-card-info">
                    <span>Farm Photographs</span>
                    <b>{stats.galleryCount}</b>
                  </div>
                  <div className="stat-card-icon purple">
                    <ImageIcon size={22} />
                  </div>
                </div>
              </div>

              {/* Quick Actions Shortcuts */}
              <div className="admin-panel-card">
                <div className="admin-panel-header">
                  <div>
                    <h3>Quick Management Links</h3>
                    <p>Direct navigation to primary management modules</p>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
                  <button
                    onClick={() => setActiveTab('Consultation Bookings')}
                    className="admin-stat-card"
                    style={{ textAlign: 'left', cursor: 'pointer', border: '1px solid #d0ddd0' }}
                  >
                    <div>
                      <b style={{ fontSize: '15px', color: '#124B2A', display: 'block' }}>Manage Bookings</b>
                      <small style={{ color: '#586B60' }}>Review & follow up on enquiries</small>
                    </div>
                    <ArrowUpRight size={18} color="#124B2A" />
                  </button>

                  <button
                    onClick={() => setActiveTab('Crop Services')}
                    className="admin-stat-card"
                    style={{ textAlign: 'left', cursor: 'pointer', border: '1px solid #d0ddd0' }}
                  >
                    <div>
                      <b style={{ fontSize: '15px', color: '#124B2A', display: 'block' }}>Crop Services</b>
                      <small style={{ color: '#586B60' }}>Update sugarcane, banana care</small>
                    </div>
                    <ArrowUpRight size={18} color="#124B2A" />
                  </button>

                  <button
                    onClick={() => setActiveTab('Gallery Management')}
                    className="admin-stat-card"
                    style={{ textAlign: 'left', cursor: 'pointer', border: '1px solid #d0ddd0' }}
                  >
                    <div>
                      <b style={{ fontSize: '15px', color: '#124B2A', display: 'block' }}>Farm Gallery</b>
                      <small style={{ color: '#586B60' }}>Upload or edit farm photos</small>
                    </div>
                    <ArrowUpRight size={18} color="#124B2A" />
                  </button>

                  <button
                    onClick={() => setActiveTab('Website Settings')}
                    className="admin-stat-card"
                    style={{ textAlign: 'left', cursor: 'pointer', border: '1px solid #d0ddd0' }}
                  >
                    <div>
                      <b style={{ fontSize: '15px', color: '#124B2A', display: 'block' }}>Website Settings</b>
                      <small style={{ color: '#586B60' }}>WhatsApp & contact details</small>
                    </div>
                    <ArrowUpRight size={18} color="#124B2A" />
                  </button>
                </div>
              </div>

              {/* Recent Bookings Table */}
              <div className="admin-panel-card">
                <div className="admin-panel-header">
                  <div>
                    <h3>Recent Consultation Requests</h3>
                    <p>Latest incoming enquiries from farmers</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('Consultation Bookings')}
                    className="btn btn-outline"
                    style={{ padding: '6px 14px', fontSize: '12px' }}
                  >
                    View All Bookings →
                  </button>
                </div>

                <div className="admin-table-responsive">
                  <table className="admin-data-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Farmer Name</th>
                        <th>Phone</th>
                        <th>Crop</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentBookings.length === 0 ? (
                        <tr>
                          <td colSpan="5" style={{ textAlign: 'center', padding: '24px', color: '#586B60' }}>
                            No consultation requests submitted yet. Use the website form to create your first booking!
                          </td>
                        </tr>
                      ) : (
                        recentBookings.map((b) => (
                          <tr key={b._id}>
                            <td style={{ fontSize: '12px', color: '#586B60' }}>
                              {new Date(b.createdAt).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short'
                              })}
                            </td>
                            <td><b>{b.name}</b></td>
                            <td>{b.phone}</td>
                            <td><span style={{ fontWeight: '600', color: '#124B2A' }}>{b.crop}</span></td>
                            <td>
                              <span className={`badge-status ${b.status || 'New'}`}>
                                {b.status || 'New'}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Crop Services' && <ServicesManager showToast={showToast} />}
          {activeTab === 'Consultation Bookings' && <BookingsManager showToast={showToast} />}
          {activeTab === 'Gallery Management' && <GalleryManager showToast={showToast} />}
          {activeTab === 'Testimonials' && <TestimonialsManager showToast={showToast} />}
          {activeTab === 'Contact Messages' && <MessagesManager showToast={showToast} />}
          {activeTab === 'Website Settings' && <SettingsManager showToast={showToast} />}
        </div>
      </div>
    </div>
  );
}
