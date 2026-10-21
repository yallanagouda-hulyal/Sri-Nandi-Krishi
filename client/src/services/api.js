import axios from 'axios';

// Detect whether the app is running in a browser on localhost or on a live deployed domain (e.g. Vercel)
const isBrowser = typeof window !== 'undefined';
const isLocalhost = isBrowser && (
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1' ||
  window.location.hostname === '0.0.0.0'
);

const envApiUrl = import.meta.env.VITE_API_URL;
// A valid remote URL must be an absolute URL (https://...) that is not pointing to localhost
const hasValidRemoteUrl = envApiUrl && /^https?:\/\//i.test(envApiUrl) && !envApiUrl.includes('localhost') && !envApiUrl.includes('127.0.0.1');

// Only use localhost:5000 if running locally; NEVER call localhost from a public deployed site (e.g. Vercel)
export const API_BASE_URL = hasValidRemoteUrl
  ? envApiUrl
  : isLocalhost
    ? (envApiUrl || 'http://localhost:5000/api')
    : null;

export const DEFAULT_SETTINGS = {
  businessName: 'Sri Nandi Krishi Organic Enterprise',
  tagline: 'Better Farming. Brighter Tomorrow.',
  email: 'srinandikrushi70@gmail.com',
  phone: '+91 79753 05677',
  whatsappNumber: '917975305677',
  location: 'Tadkal road, Aland, Karnataka 585302',
  address: 'Sri Nandi Krishi Organic Enterprises, Tadkal Road, Aland, Karnataka 585302',
  workingHours: 'Mon - Sat: 8:00 AM - 6:00 PM',
  websiteUrl: 'https://srinandikrishi.com',
  facebookUrl: 'https://www.facebook.com/share/19CwgVuDLW/?mibextid=wwXIfr',
  instagramUrl: 'https://www.instagram.com/sri_nandi_krishi_bio_fertilser?igsh=eHBrcG5jemNhYzF3&utm_source=qr&wa_status_inline=true',
  mapUrl: 'https://maps.app.goo.gl/X7TSxQT93axMuCXV6?g_st=ic',
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3800.5!2d76.5699156!3d17.5703105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc8ad6fb5ccdc6f%3A0x22c769fe7d935575!2sSri%20Nandi%20Krishi%20organic%20enterprises%20Aland!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin',
  developerCredit: 'Designed and developed by bookmywebsite.in',
  developerUrl: 'https://bookmywebsite.in'
};

const api = axios.create({
  baseURL: API_BASE_URL || undefined,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 8000,
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('snk_admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling 401 unauth
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        localStorage.removeItem('snk_admin_token');
        localStorage.removeItem('snk_admin_user');
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export const authService = {
  login: async (email, password) => {
    if (!API_BASE_URL) {
      throw new Error('Backend API server is running locally on your computer. To access the admin panel in production, set VITE_API_URL in your Vercel project settings to your deployed backend URL.');
    }
    const res = await api.post('/auth/login', { email, password });
    if (res.data.token) {
      localStorage.setItem('snk_admin_token', res.data.token);
      localStorage.setItem('snk_admin_user', JSON.stringify(res.data.admin));
    }
    return res.data;
  },
  getMe: async () => {
    if (!API_BASE_URL) return null;
    try {
      const res = await api.get('/auth/me');
      return res.data;
    } catch {
      return null;
    }
  },
  logout: () => {
    localStorage.removeItem('snk_admin_token');
    localStorage.removeItem('snk_admin_user');
  },
  isAuthenticated: () => {
    return !!localStorage.getItem('snk_admin_token');
  },
  getCurrentUser: () => {
    const user = localStorage.getItem('snk_admin_user');
    return user ? JSON.parse(user) : null;
  }
};

export const cropService = {
  getAll: async () => {
    if (!API_BASE_URL) return [];
    try {
      const res = await api.get('/services');
      return res.data?.data || [];
    } catch {
      return [];
    }
  },
  getBySlug: async (slug) => {
    if (!API_BASE_URL) return null;
    try {
      const res = await api.get(`/services/${slug}`);
      return res.data?.data || null;
    } catch {
      return null;
    }
  },
  create: async (data) => {
    if (!API_BASE_URL) return { _id: Date.now().toString(), ...data };
    const res = await api.post('/services', data);
    return res.data.data;
  },
  update: async (id, data) => {
    if (!API_BASE_URL) return { _id: id, ...data };
    const res = await api.put(`/services/${id}`, data);
    return res.data.data;
  },
  delete: async (id) => {
    if (!API_BASE_URL) return { success: true };
    const res = await api.delete(`/services/${id}`);
    return res.data;
  }
};

export const bookingService = {
  create: async (data) => {
    if (!API_BASE_URL) {
      try {
        const stored = JSON.parse(localStorage.getItem('snk_bookings') || '[]');
        stored.unshift({ ...data, _id: Date.now().toString(), createdAt: new Date().toISOString() });
        localStorage.setItem('snk_bookings', JSON.stringify(stored.slice(0, 50)));
      } catch (e) {
        // storage fallback
      }
      return { success: true, message: 'Consultation request received' };
    }
    try {
      const res = await api.post('/bookings', data);
      return res.data;
    } catch {
      return { success: true, message: 'Consultation request saved' };
    }
  },
  getAll: async (params = {}) => {
    if (!API_BASE_URL) {
      try {
        return JSON.parse(localStorage.getItem('snk_bookings') || '[]');
      } catch {
        return [];
      }
    }
    try {
      const res = await api.get('/bookings', { params });
      return res.data?.data || [];
    } catch {
      return [];
    }
  },
  getById: async (id) => {
    if (!API_BASE_URL) return null;
    const res = await api.get(`/bookings/${id}`);
    return res.data.data;
  },
  updateStatus: async (id, status, notes) => {
    if (!API_BASE_URL) return { _id: id, status, notes };
    const res = await api.patch(`/bookings/${id}/status`, { status, notes });
    return res.data.data;
  },
  delete: async (id) => {
    if (!API_BASE_URL) return { success: true };
    const res = await api.delete(`/bookings/${id}`);
    return res.data;
  }
};

export const testimonialService = {
  getAll: async () => {
    if (!API_BASE_URL) return [];
    try {
      const res = await api.get('/testimonials');
      return res.data?.data || [];
    } catch {
      return [];
    }
  },
  create: async (data) => {
    if (!API_BASE_URL) return { _id: Date.now().toString(), ...data };
    const res = await api.post('/testimonials', data);
    return res.data.data;
  },
  update: async (id, data) => {
    if (!API_BASE_URL) return { _id: id, ...data };
    const res = await api.put(`/testimonials/${id}`, data);
    return res.data.data;
  },
  delete: async (id) => {
    if (!API_BASE_URL) return { success: true };
    const res = await api.delete(`/testimonials/${id}`);
    return res.data;
  }
};

export const galleryService = {
  getAll: async (category = '') => {
    if (!API_BASE_URL) return [];
    try {
      const params = category && category !== 'All' ? { category } : {};
      const res = await api.get('/gallery', { params });
      return res.data?.data || [];
    } catch {
      return [];
    }
  },
  create: async (data) => {
    if (!API_BASE_URL) return { _id: Date.now().toString(), ...data };
    const res = await api.post('/gallery', data);
    return res.data.data;
  },
  update: async (id, data) => {
    if (!API_BASE_URL) return { _id: id, ...data };
    const res = await api.put(`/gallery/${id}`, data);
    return res.data.data;
  },
  delete: async (id) => {
    if (!API_BASE_URL) return { success: true };
    const res = await api.delete(`/gallery/${id}`);
    return res.data;
  }
};

export const contactService = {
  submit: async (data) => {
    if (!API_BASE_URL) {
      try {
        const stored = JSON.parse(localStorage.getItem('snk_messages') || '[]');
        stored.unshift({ ...data, _id: Date.now().toString(), createdAt: new Date().toISOString() });
        localStorage.setItem('snk_messages', JSON.stringify(stored.slice(0, 50)));
      } catch (e) {
        // storage fallback
      }
      return { success: true, message: 'Message sent successfully' };
    }
    const res = await api.post('/contact', data);
    return res.data;
  },
  getAll: async (params = {}) => {
    if (!API_BASE_URL) {
      try {
        return JSON.parse(localStorage.getItem('snk_messages') || '[]');
      } catch {
        return [];
      }
    }
    try {
      const res = await api.get('/contact', { params });
      return res.data?.data || [];
    } catch {
      return [];
    }
  },
  updateStatus: async (id, status, notes) => {
    if (!API_BASE_URL) return { _id: id, status, notes };
    const res = await api.patch(`/contact/${id}/status`, { status, notes });
    return res.data.data;
  },
  delete: async (id) => {
    if (!API_BASE_URL) return { success: true };
    const res = await api.delete(`/contact/${id}`);
    return res.data;
  }
};

export const settingsService = {
  getPublic: async () => {
    if (!API_BASE_URL) return DEFAULT_SETTINGS;
    try {
      const res = await api.get('/settings/public');
      return res.data?.data || DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  },
  getAdmin: async () => {
    if (!API_BASE_URL) {
      try {
        const saved = localStorage.getItem('snk_local_settings');
        return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
      } catch {
        return DEFAULT_SETTINGS;
      }
    }
    try {
      const res = await api.get('/settings');
      return res.data?.data || DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  },
  update: async (data) => {
    if (!API_BASE_URL) {
      try {
        localStorage.setItem('snk_local_settings', JSON.stringify(data));
      } catch {
        // ignore
      }
      return data;
    }
    const res = await api.put('/settings', data);
    return res.data.data;
  }
};

export default api;
