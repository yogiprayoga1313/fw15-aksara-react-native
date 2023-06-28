import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import reducer from './reducers';
import logger from 'redux-logger';

const store = configureStore({
  reducer,
  middleware: [logger, thunk],
});

export default store;
