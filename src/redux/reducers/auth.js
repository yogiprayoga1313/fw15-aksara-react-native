import {asyncLogin} from '../actions/auth';

const {createSlice} = require('@reduxjs/toolkit');

const initialState = {
  token: null,
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
    },
    register: (state, action) => {
      state.token = action.payload;
    },
    logout: () => {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder.addCase(asyncLogin.pending, state => {
      state.errorMessage = '';
    });
    builder.addCase(asyncLogin.fulfilled, (state, action) => {
      state.token = action.payload;
    });
    builder.addCase(asyncLogin.rejected, (state, action) => {
      state.errorMessage = action.payload;
    });
  },
});

export const {login, register, logout} = auth.actions;
export default auth.reducer;
