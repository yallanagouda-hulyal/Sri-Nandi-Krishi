import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
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
      // If unauthorized on protected route, remove expired token
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
    const res = await api.post('/auth/login', { email, password });
    if (res.data.token) {
      localStorage.setItem('snk_admin_token', res.data.token);
      localStorage.setItem('snk_admin_user', JSON.stringify(res.data.admin));
    }
    return res.data;
  },
  getMe: async () => {
    const res = await api.get('/auth/me');
    return res.data;
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
    const res = await api.get('/services');
    return res.data.data;
  },
  getBySlug: async (slug) => {
    const res = await api.get(`/services/${slug}`);
    return res.data.data;
  },
  create: async (data) => {
    const res = await api.post('/services', data);
    return res.data.data;
  },
  update: async (id, data) => {
    const res = await api.put(`/services/${id}`, data);
    return res.data.data;
  },
  delete: async (id) => {
    const res = await api.delete(`/services/${id}`);
    return res.data;
  }
};

export const bookingService = {
  create: async (data) => {
    const res = await api.post('/bookings', data);
    return res.data;
  },
  getAll: async (params = {}) => {
    const res = await api.get('/bookings', { params });
    return res.data.data;
  },
  getById: async (id) => {
    const res = await api.get(`/bookings/${id}`);
    return res.data.data;
  },
  updateStatus: async (id, status, notes) => {
    const res = await api.patch(`/bookings/${id}/status`, { status, notes });
    return res.data.data;
  },
  delete: async (id) => {
    const res = await api.delete(`/bookings/${id}`);
    return res.data;
  }
};

export const testimonialService = {
  getAll: async () => {
    const res = await api.get('/testimonials');
    return res.data.data;
  },
  create: async (data) => {
    const res = await api.post('/testimonials', data);
    return res.data.data;
  },
  update: async (id, data) => {
    const res = await api.put(`/testimonials/${id}`, data);
    return res.data.data;
  },
  delete: async (id) => {
    const res = await api.delete(`/testimonials/${id}`);
    return res.data;
  }
};

export const galleryService = {
  getAll: async (category = '') => {
    const params = category && category !== 'All' ? { category } : {};
    const res = await api.get('/gallery', { params });
    return res.data.data;
  },
  create: async (data) => {
    const res = await api.post('/gallery', data);
    return res.data.data;
  },
  update: async (id, data) => {
    const res = await api.put(`/gallery/${id}`, data);
    return res.data.data;
  },
  delete: async (id) => {
    const res = await api.delete(`/gallery/${id}`);
    return res.data;
  }
};

export const contactService = {
  submit: async (data) => {
    const res = await api.post('/contact', data);
    return res.data;
  },
  getAll: async (params = {}) => {
    const res = await api.get('/contact', { params });
    return res.data.data;
  },
  updateStatus: async (id, status, notes) => {
    const res = await api.patch(`/contact/${id}/status`, { status, notes });
    return res.data.data;
  },
  delete: async (id) => {
    const res = await api.delete(`/contact/${id}`);
    return res.data;
  }
};

export const settingsService = {
  getPublic: async () => {
    const res = await api.get('/settings/public');
    return res.data.data;
  },
  getAdmin: async () => {
    const res = await api.get('/settings');
    return res.data.data;
  },
  update: async (data) => {
    const res = await api.put('/settings', data);
    return res.data.data;
  }
};

export default api;
