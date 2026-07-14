import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userInfo");
};

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    if (isTokenExpired(token)) {
      clearAuth();
      window.location.href = "/admin/login";
      return Promise.reject(new Error("Token expired"));
    }
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAuth();
      window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  }
);

export default api;
