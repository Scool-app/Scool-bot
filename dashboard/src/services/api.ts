import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  getLoginUrl: () => {
    const clientId = import.meta.env.VITE_DISCORD_CLIENT_ID || '';
    const redirectUri = encodeURIComponent(`${window.location.origin}/auth/callback`);
    return `https://discord.com/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=identify%20guilds`;
  },

  login: async (code: string) => {
    const response = await api.post('/auth/login', { code });
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};

export const guildService = {
  getGuilds: async () => {
    const response = await api.get('/guilds');
    return response.data;
  },

  getGuildConfig: async (guildId: string) => {
    const response = await api.get(`/guilds/${guildId}/config`);
    return response.data;
  },

  updateGuildConfig: async (guildId: string, config: Partial<GuildConfig>) => {
    const response = await api.patch(`/guilds/${guildId}/config`, config);
    return response.data;
  },

  getGuildStats: async (guildId: string) => {
    const response = await api.get(`/guilds/${guildId}/stats`);
    return response.data;
  },
};

export const botService = {
  getStats: async () => {
    const response = await api.get('/bot/stats');
    return response.data;
  },

  getGuildsCount: async () => {
    const response = await api.get('/bot/guilds/count');
    return response.data;
  },
};
