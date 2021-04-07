import axios from 'axios';

export const axiosInstance = axios.create({
  // baseURL: 'https://thawing-inlet-42519.herokuapp.com/api',
  baseURL: 'http://18.136.85.164/api',
  timeout: 100000,
});
