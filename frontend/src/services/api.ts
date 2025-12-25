import axios from "axios";

const api = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true,
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtamY3MzBpdjAwMDA1dHFleTMwd2RrbWYiLCJuYW1lIjoiSm9obiBEb2UiLCJyb2xlIjoiUFJPVklERVIiLCJpYXQiOjE3NjY1ODI3NjAsImV4cCI6MTc2NzE4NzU2MH0.Y61POeAA0tFdRYsBTFkErtt4Wv41j75MGJcNY5YvZMM`,
  },
});

export default api;
