// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import musicReducer from './reducers/musicReducer.js';

const store = configureStore({
  reducer: {
    music: musicReducer,
  },
});

export default store;
