import axios from "axios";

let authToken: string | null = null;
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const setAuthToken = (token: string | null) => {
  authToken = token;
};

api.interceptors.request.use((config) => {
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

export default api;
