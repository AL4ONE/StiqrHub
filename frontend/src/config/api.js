import axios from 'axios';

<<<<<<< HEAD
// Base URL dari environment variable
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL + '/api';
=======
// Base URL dari environment variable - remove trailing slash to avoid double slashes
const backendUrl = (import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000').replace(/\/+$/, '');
const API_BASE_URL = `${backendUrl}/api`;
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 10000 // 10 detik timeout
});

// Request interceptor - auto attach token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error
      console.error('API Error:', error.response.data);
      
      // Handle unauthorized (401)
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
<<<<<<< HEAD
        window.location.href = '/start';
=======
        window.location.href = '/';
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382
      }
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
  
);

export default api;