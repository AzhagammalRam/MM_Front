import axios  from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_URL
});


api.interceptors.request.use(
    (config) => {
      let token = localStorage.getItem('token')
      config.headers.token = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);
  
  // Add response interceptors (e.g., for handling errors globally)
//   api.interceptors.response.use(
//     (response) => {
//       return response;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );
  
  export default api;