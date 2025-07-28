import axios from 'axios';

const api = axios.create({
  baseURL: 'https://test-dnc-api-battle-back.onrender.com',
});

export default api;
