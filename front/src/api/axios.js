import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dembeni-back.onrender.com/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to request headers if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
