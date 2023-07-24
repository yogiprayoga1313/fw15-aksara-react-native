import axios from 'axios';
import {BACKEND_URL} from '@env';

const http = token => {
  const headers = {};
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }
  console.log(headers);
  const instance = axios.create({
    // baseURL: BACKEND_URL,
    baseURL: 'https://calm-rose-octopus-sari.cyclic.app',
    headers,
  });
  return instance;
};
export default http;
