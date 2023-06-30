import {createAsyncThunk} from '@reduxjs/toolkit';
import http from '../../helpers/http';

export const asyncLogin = createAsyncThunk(
  'asyncLogin',
  async (paylaod, {rejectWithValue}) => {
    try {
      const form = new URLSearchParams();
      console.log(paylaod);
      form.append('email', paylaod.email);
      form.append('password', paylaod.password);

      const {data} = await http().post('/auth/login', form.toString());
      return data.results.token;
    } catch (err) {
      const message = err?.response?.data?.message;
      if (message) {
        return rejectWithValue(message);
      } else {
        return rejectWithValue(err.message);
      }
    }
  },
);

export const asyncRegister = createAsyncThunk(
  'asyncRegister',
  async (paylaod, {rejectWithValue}) => {
    try {
      const form = new URLSearchParams();
      console.log(paylaod);
      form.append('fullName', paylaod.fullName);
      form.append('email', paylaod.email);
      form.append('password', paylaod.password);
      form.append('confirmPassword', paylaod.confirmPassword);

      const {data} = await http().post('/auth/register', form.toString());
      return data.results.token;
    } catch (err) {
      const message = err?.response?.data?.message;
      if (message) {
        return rejectWithValue(message);
      } else {
        return rejectWithValue(err.message);
      }
    }
  },
);
