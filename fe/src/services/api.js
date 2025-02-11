import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export const getHello = async () => {
  try {
    const response = await api.get('/hello');
    return response.data;
  } catch (error) {
    console.error('Error fetching hello:', error);
    throw error;
  }
}; 