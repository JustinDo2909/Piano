import {  createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authUser: JSON.parse(sessionStorage.getItem("authUser")) || {
            token: '',
            dateOfBirth: '',
            email: '',
            id :'',
            image : '',
            name: '',
            phoneNumber: '',
            role: '',
            userName: '',
        },
    },
    reducers: {
        login(state, action) {
            const userData = action.payload;
            state.authUser = userData;
            const saveState = JSON.stringify(userData);
            sessionStorage.setItem("authUser", saveState);
        },
        logout(state) {
            state.authUser = {
                token: '',
                dateOfBirth: '',
                email: '',
                id :'',
                image : '',
                name: '',
                phoneNumber: '',
                role: '',
                userName: '',
            };
            sessionStorage.clear();
        },  
        info (state , action) {
            const userData = action.payload;
            state.authUser = { ...state.authUser, ...userData };
            sessionStorage.setItem("authUser", JSON.stringify(state.authUser));
        }
    }
})

export const { login, logout, info } = authSlice.actions;
export default authSlice.reducer;
