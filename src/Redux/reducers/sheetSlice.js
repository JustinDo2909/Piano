import { createSlice } from "@reduxjs/toolkit";

export const sheetSlice = createSlice({
    name: 'sheets',
    initialState: {
        sheets: JSON.parse(sessionStorage.getItem("sheets")) || [],
    },
    reducers: {
        getSheet(state, action) {
            const sheetData = action.payload;
            state.sheets = sheetData;
            const saveState = JSON.stringify(sheetData);
            sessionStorage.setItem("sheets", saveState);
        },
        updateSheet(state, action) {
            const { songId, instrumentId, topSignature, bottomSignature, parseRightSymbol, parseLeftSymbol } = action.payload;
            const index = state.sheets.findIndex(sheet => sheet.songId === songId && sheet.instrumentId === instrumentId);
            if (index !== -1) {
                state.sheets[index] = {
                    ...state.sheets[index],
                    topSignature,
                    bottomSignature,
                    parseRightSymbol,
                    parseLeftSymbol
                };
                const saveState = JSON.stringify(state.sheets);
                sessionStorage.setItem("sheets", saveState);
            }
        }
    }
})

export const { getSheet, updateSheet } = sheetSlice.actions;
export default sheetSlice.reducer;
