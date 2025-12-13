import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: 'https://fermo-dktk.onrender.com',
  withCredentials: true,
  
});

export default axiosInstance;