import { createSlice, configureStore } from '@reduxjs/toolkit'

const initialAuthState = {
    isAuthenticated: false,
}

const authSlice = createSlice({
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

const initialCurrentAccountState = {
    
}

const store = configureStore({ 
    reducer: { auth: authSlice.reducer } 
})


export const authActions = authSlice.actions;

export default store;