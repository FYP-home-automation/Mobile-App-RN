import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://thawing-inlet-42519.herokuapp.com/api',
  timeout: 100000,
});
