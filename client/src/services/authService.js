import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/auth`;
export const registerUser = async (data) => {
  const res = await axios.post(`${API}/register`, data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await axios.post(`${API}/login`, data);
  return res.data;
};