import axios from "axios";

const API = "http://localhost:5000/api/reviews";

export const createReview = async (data, token) => {
  const res = await axios.post(API, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getMyReviews = async (token) => {
  const res = await axios.get(`${API}/my`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};