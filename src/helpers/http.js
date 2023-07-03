import axios from 'axios';
import {BACKEND_URL} from '@env';
console.log(BACKEND_URL);

const http = token => {
  const headers = {};
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }
  console.log(headers);
  const instance = axios.create({
    baseURL: BACKEND_URL,
    headers,
  });
  return instance;
};
export default http;
