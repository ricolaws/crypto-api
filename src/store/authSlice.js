import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
    isAuthenticated: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        logIn (state) {
            state.isAuthenticated = true;
        },
        logOut (state) {
            state.isAuthenticated = false;
        },
    }
})

export const authActions = authSlice.actions;

