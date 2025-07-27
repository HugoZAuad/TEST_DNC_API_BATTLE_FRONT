import axios from 'axios';

const api = axios.create({
  baseURL: 'https://test-dnc-api-battle-back.onrender.com',
  timeout: 5000,
});

export default api;
