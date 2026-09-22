import axios from "axios";

// Backend ka base URL - local development ke liye
// Deploy karte waqt isse apne Render backend URL se replace karna hoga
const API_URL = "http://localhost:5000/api";

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