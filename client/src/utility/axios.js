import axios from "axios";

// Key the login token is stored under (kept the same so existing sessions stay valid)
export const TOKEN_KEY = "EV-Forum-token-G3-Jun2024";

// Set VITE_API_URL in client/.env for local development, e.g. http://localhost:3004/api
const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://kewani-evangadi-forum.onrender.com/api";

export const axiosInstance = axios.create({ baseURL: API_URL });

// Send the login token with every request so protected routes (posting) work
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
