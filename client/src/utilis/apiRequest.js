import axios from 'axios'

const apiRequest = axios.create({
    baseURL: import.meta.env.VITE_API_ENDPOINT || "https://pininterest-jcrd.onrender.com",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      // Add this if using JWT:
      Authorization: localStorage.getItem('token') 
        ? `Bearer ${localStorage.getItem('token')}` 
        : undefined
    }
  });
export default apiRequest;