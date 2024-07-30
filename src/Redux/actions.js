// src/redux/actions/musicActions.js
export const SET_MUSIC_LIST = 'SET_MUSIC_LIST';
export const ADD_MUSIC = 'ADD_MUSIC';

export const setMusicList = (musicList) => ({
  type: SET_MUSIC_LIST,
  payload: musicList,
});

export const addMusic = (newMusic) => ({
  type: ADD_MUSIC,
  payload: newMusic,
});
