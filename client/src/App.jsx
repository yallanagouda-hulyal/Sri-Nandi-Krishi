import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import CropDetails from './pages/CropDetails';
import ProductsPage from './pages/ProductsPage';
import ProductDetails from './pages/ProductDetails';
import GalleryPage from './pages/GalleryPage';
import TestimonialsPage from './pages/TestimonialsPage';
import ContactPage from './pages/ContactPage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import NotFound from './pages/NotFound';
import { authService } from './services/api';

// Protected Admin Route Guard
function ProtectedAdminRoute({ children }) {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}

export default function App() {
  return (
    <Routes>
      {/* Complete Public Website Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/services/sugarcane" element={<CropDetails />} />
      <Route path="/services/banana" element={<CropDetails />} />
      <Route path="/services/papaya" element={<CropDetails />} />
      <Route path="/services/watermelon" element={<CropDetails />} />
      <Route path="/services/:slug" element={<CropDetails />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/testimonials" element={<TestimonialsPage />} />
      <Route path="/contact" element={<ContactPage />} />

      {/* Admin Portal Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedAdminRoute>
            <AdminDashboard initialTab="Overview" />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/bookings"
        element={
          <ProtectedAdminRoute>
            <AdminDashboard initialTab="Bookings" />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/services"
        element={
          <ProtectedAdminRoute>
            <AdminDashboard initialTab="Crop Services" />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/gallery"
        element={
          <ProtectedAdminRoute>
            <AdminDashboard initialTab="Gallery" />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/testimonials"
        element={
          <ProtectedAdminRoute>
            <AdminDashboard initialTab="Testimonials" />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/messages"
        element={
          <ProtectedAdminRoute>
            <AdminDashboard initialTab="Messages" />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/settings"
        element={
          <ProtectedAdminRoute>
            <AdminDashboard initialTab="Settings" />
          </ProtectedAdminRoute>
        }
      />
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

      {/* 404 Catch-All */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
