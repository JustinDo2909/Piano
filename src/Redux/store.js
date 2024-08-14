import { configureStore } from "@reduxjs/toolkit";
import musicReducer from "./reducers/musicReducer.js";
import authSlice from "./reducers/authSlice.js";

const store = configureStore({
  reducer: {
    music: musicReducer,
    authUser: authSlice
  },
});

export default store;
