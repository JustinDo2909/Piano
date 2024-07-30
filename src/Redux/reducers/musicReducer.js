// src/redux/reducers/musicReducer.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  musicList: [], // Initial state for the music list
};

const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    setMusicList(state, action) {
      state.musicList = action.payload;
    },
    addMusic(state, action) {
      state.musicList.push(action.payload);
    },
  },
});

export const { setMusicList, addMusic } = musicSlice.actions;

export default musicSlice.reducer;
