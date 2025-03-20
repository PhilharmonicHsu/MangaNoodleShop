import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 通用錯誤處理
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response ? error.response.data : error.message);
    
    return Promise.reject(error);
  }
);

export default api;
