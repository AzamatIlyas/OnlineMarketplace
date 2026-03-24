import axios from 'axios';

// API base URL - change this to your backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: async (email, password, fullName) => {
    const response = await api.post('/api/auth/register', {
      email,
      password,
      full_name: fullName,
    });
    return response.data;
  },

  login: async (email, password) => {
    const response = await api.post('/api/auth/login', {
      email,
      password,
    });

    if (response.data.access_token) {
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }

    return response.data;
  },


  logout: async () => {
    try {
      await api.post('/api/auth/logout');
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
    }
  },

  getCurrentUser: async () => {
    const response = await api.get('/api/auth/me');
    return response.data;
  },
};

// Ads API
export const adsAPI = {
  getAds: async (params = {}) => {
    // If category_id is provided, use category endpoint instead
    if (params.category_id) {
      const response = await api.get(`/api/categories/${params.category_id}/ads`);
      return response.data;
    }
    // If search query is provided
    if (params.search) {
      const response = await api.get(`/api/ads/search`, { params: { name: params.search } });
      return response.data;
    }
    // Default: get all ads
    const response = await api.get('/api/ads', { params });
    return response.data;
  },

  searchAds: async (query) => {
    const response = await api.get(`/api/ads/search`, { params: { name: query } });
    return response.data;
  },

  getAd: async (id) => {
    const response = await api.get(`/api/ads/${id}`);
    return response.data;
  },

  createAd: async (adData) => {
    const response = await api.post('/api/ads', adData);
    return response.data;
  },

  updateAd: async (id, adData) => {
    const response = await api.put(`/api/ads/${id}`, adData);
    return response.data;
  },

  deleteAd: async (id) => {
    const response = await api.delete(`/api/ads/${id}`);
    return response.data;
  },

  likeAd: async (id) => {
    const response = await api.post(`/ads/${id}/likes`);
    return response.data;
  },

  unlikeAd: async (id) => {
    const response = await api.delete(`/ads/${id}/likes`);
    return response.data;
  },
};

// Categories API
export const categoriesAPI = {
  getCategories: async () => {
    const response = await api.get('/api/categories');
    return response.data;
  },
};

// Favourites API
export const favouritesAPI = {
  getFavourites: async () => {
    const response = await api.get('/api/favourites');
    return response.data;
  },

  addFavourite: async (adId) => {
    const response = await api.post(`/ads/${adId}/favourites`);
    return response.data;
  },

  removeFavourite: async (adId) => {
    const response = await api.delete(`/ads/${adId}/favourites`);
    return response.data;
  },
};

// Likes API
export const likesAPI = {
  getLikedAds: async () => {
    const response = await api.get('/api/likes');
    return response.data;
  },
};

// Chat API
export const chatAPI = {
  getChats: async () => {
    const response = await api.get('/api/chats');
    return response.data;
  },

  createChat: async (adId) => {
    const response = await api.post(`/ads/${adId}/chat`);
    return response.data;
  },

  getMessages: async (chatId) => {
    const response = await api.get(`/api/chats/${chatId}/messages`);
    return response.data;
  },
};

// History API
export const historyAPI = {
  getHistory: async () => {
    const response = await api.get('/api/view-history/');
    return response.data;
  },
};

// Recommendations API
export const recommendationsAPI = {
  getRecommendations: async () => {
    const response = await api.get('/api/ads/recommendations');
    return response.data;
  },
};

// User API
export const userAPI = {
  getMe: async () => {
    const response = await api.get('/api/users/me');
    return response.data;
  },

  getMyPrivate: async () => {
    const response = await api.get('/api/users/me/private');
    return response.data;
  },

  getMyAds: async () => {
    const response = await api.get('/api/users/ads');
    return response.data;
  },

  getMyReports: async () => {
    const response = await api.get('/api/users/reports');
    return response.data;
  },

  getMyReport: async (reportId) => {
    const response = await api.get(`/api/users/reports/${reportId}`);
    return response.data;
  },
};

// Report API
export const reportAPI = {
  getReports: async () => {
    const response = await api.get('/api/report/');
    return response.data;
  },

  createReport: async (reportData) => {
    const response = await api.post('/api/report/', reportData);
    return response.data;
  },

  getReport: async (reportId) => {
    const response = await api.get(`/api/report/${reportId}`);
    return response.data;
  },
};

export default api;
