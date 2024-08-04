// features/music/musicSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  musicList: [],
  genres: [],
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
    setGenres(state, action) {
      state.genres = action.payload;
    },
    addGenre(state, action) {
      state.genres.push(action.payload);
    },
    deleteGenre(state, action) {
      state.genres = state.genres.filter(genre => genre.idTypeMusic !== action.payload);
    },
    updateGenre(state, action) {
      const { idTypeMusic, nameTypeMusic, description, music_list, artist_list, NumberOfPlayed, createdate } = action.payload;
      const existingTypeMusic = state.genres.find(type => type.idTypeMusic === idTypeMusic);
      if (existingTypeMusic) {
        existingTypeMusic.nameTypeMusic = nameTypeMusic;
        existingTypeMusic.description = description;
        existingTypeMusic.music_list = music_list;
        existingTypeMusic.artist_list = artist_list;
        existingTypeMusic.NumberOfPlayed = NumberOfPlayed;
        existingTypeMusic.createdate = createdate;
      }
    },
  },
});

export const { setMusicList, addMusic, setGenres, addGenre, deleteGenre, updateGenre } = musicSlice.actions;

export default musicSlice.reducer;
