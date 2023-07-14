import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:1800',
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// axiosInstance.interceptors.request.use(
//   (config) => {
//     // Modify the request config
//     return config;
//   },
//   (error) => {
//     // Handle request errors
//     return Promise.reject(error);
//   }
// );

// axiosInstance.interceptors.response.use(
//   (response) => {
//     // Modify the response data
//     return response;
//   },
//   (error) => {
//     // Handle response errors
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
