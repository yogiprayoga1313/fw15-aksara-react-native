import axios from 'axios';
import {BACKEND_URL} from '@env';

const http = token => {
  const headers = {};
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }
  console.log(headers);
  const instance = axios.create({
    baseURL: BACKEND_URL,
    // baseURL: 'https://lime-frail-crow.cyclic.app',
    headers,
  });
  return instance;
};
export default http;
