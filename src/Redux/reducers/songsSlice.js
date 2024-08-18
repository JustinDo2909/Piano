import { createSlice } from "@reduxjs/toolkit";

export const songSlice = createSlice({
    name: 'songs',
    initialState: {
        songs : JSON.parse(sessionStorage.getItem("songs")) || []
    },
    reducers: {
        getSong(state , action){
            const songData = action.payload;
            state.songs = songData;
            const saveState = JSON.stringify(songData);
            sessionStorage.setItem("songs" , saveState)
        }
    }
})

export const {getSong} = songSlice.actions;
export default songSlice.reducer;