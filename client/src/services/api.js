import axios from "axios";

const API = axios.create({
  baseURL: "https://mini-crm-4ab0.onrender.com/api", // ✅ NO SPACE
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;