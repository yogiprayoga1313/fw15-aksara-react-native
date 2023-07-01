import {asyncLogin, asyncRegister} from '../actions/auth';

const {createSlice} = require('@reduxjs/toolkit');

const initialState = {
  token: null,
  errorMessage: '',
  successMessage: '',
  warningMessage: '',
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
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    setWarningMessage: (state, action) => {
      state.warningMessage = action.payload;
    },
    clearMessage: state => {
      state.errorMessage = '';
      state.warningMessage = '';
      state.successMessage = '';
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
    builder.addCase(asyncRegister.fulfilled, (state, action) => {
      // state.token = action.payload;
      state.successMessage = action.payload;
    });
    builder.addCase(asyncRegister.rejected, (state, action) => {
      state.errorMessage = action.payload;
    });
    builder.addCase(asyncLogin.rejected, (state, action) => {
      state.errorMessage = action.payload;
    });
  },
});

export const {
  login,
  register,
  logout,
  setErrorMessage,
  setWarningMessage,
  clearMessage,
} = auth.actions;
export default auth.reducer;
