import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentUser: null,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            state.error = false;
        },
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;

        },

        signUpStart: (state) => {
            state.loading = true;
        },
        signUpSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            state.error = null;
        },
        signUpFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    signInStart,
    signInSuccess,
    signInFailure,
    signUpStart,
    signUpSuccess,
    signUpFailure,
} = userSlice.actions;
export default userSlice.reducer;