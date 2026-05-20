import axios from "axios";

const TOKEN_KEY = "authToken";

let authToken: string | null = localStorage.getItem(TOKEN_KEY);
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const setAuthToken = (token: string | null) => {
  authToken = token;
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    localStorage.removeItem(TOKEN_KEY);
    delete api.defaults.headers.common.Authorization;
  }
};

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${authToken}`;
  console.log("AXIOS TOKEN:", authToken);
  console.log("AXIOS URL:", config.url);
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }

  console.log("AXIOS HEADERS:", config.headers);
  return config;
});

export default api;
