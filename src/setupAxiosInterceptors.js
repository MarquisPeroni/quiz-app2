import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000'; 

const setupAxiosInterceptors = (store) => {
  axios.interceptors.request.use(async (config) => {
    await axios.get('/sanctum/csrf-cookie');
    return config;
  }, error => Promise.reject(error));
  
  axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 401) {
        store.dispatch({ type: 'LOGOUT' });
      }
      return Promise.reject(error);
    }
  );
};

export default setupAxiosInterceptors;
