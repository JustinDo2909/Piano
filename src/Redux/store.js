import { configureStore } from "@reduxjs/toolkit";
import musicReducer from "./reducers/musicReducer.js";
import authSlice from "./reducers/authSlice.js";
import songsSlice from "./reducers/songsSlice.js";
import typeSlice from "./reducers/typeSlice.js";
import sheetSlice from "./reducers/sheetSlice.js";

const store = configureStore({
  reducer: {
    music: musicReducer,
    authUser: authSlice,
    songs : songsSlice,
    types: typeSlice,
    sheets : sheetSlice
  },
});

export default store;
