import axios from "axios";

const api = axios.create({
  baseURL: "https://hrms-lite-backend-nhpl.onrender.com",
});

export default api;