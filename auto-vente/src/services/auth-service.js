import axios from "axios";

const API_URL = 'http://localhost:8079/SERVICE-AUTHENTIFICATION/auth';

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  const { token, role } = response.data;

  localStorage.setItem("token", token); // Stocker le token
  localStorage.setItem("role", role); // Stocker le rôle
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

export const getUserRole = () => {
  return localStorage.getItem("role");
};
