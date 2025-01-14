import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001/api', // Replace with your backend URL
});

// Add Authorization header for authenticated users
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;


