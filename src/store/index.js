import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth';
import webinarReducer from './webinar';

const store = configureStore({
  reducer: {
    auth: authReducer,
    webinar: webinarReducer,
  },
});

export default store;
