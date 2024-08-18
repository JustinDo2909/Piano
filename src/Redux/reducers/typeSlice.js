import { createSlice } from "@reduxjs/toolkit";

export const typeSlice = createSlice({
    name: 'types',
    initialState: {
        types: JSON.parse(sessionStorage.getItem('types')) || [] 
    },
    reducers: {
        getType(state, action) {
            const typeData = action.payload;
            state.types = typeData;
            sessionStorage.setItem('types', JSON.stringify(typeData));
        }
    }
});

export const { getType } = typeSlice.actions;
export default typeSlice.reducer;
