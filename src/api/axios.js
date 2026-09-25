import axios from "axios";
const API_URL = "https://task-3-and-4.onrender.com/api";

const api = axios.create({
  baseURL: API_URL,
});

// Har request ke saath automatically token bhej do (agar login hai to)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;