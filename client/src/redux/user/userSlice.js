import { createSlice } from "@reduxjs/toolkit";
import { updateProfile } from "firebase/auth";


const initialState = {
    currentUser: null,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setValues: (state) => {
            state.loading = false;
            state.error = null;
        },
        signInStart: (state) => {
            state.loading = true;
            state.error = null;

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
        signOut: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        updateProfileStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        updateProfileSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            state.error = null;
        },
        updateProfileFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteProfileStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        deleteProfileSuccess: (state) => {
            state.loading = false;
            state.currentUser = null;
            state.error = null;
        },
        deleteProfileFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

    },
});

export const {
    setValues,
    signInStart,
    signInSuccess,
    signInFailure,
    signUpStart,
    signUpSuccess,
    signUpFailure,
    signOut,
    updateProfileStart,
    updateProfileSuccess,
    updateProfileFailure,
    deleteProfileFailure,
    deleteProfileStart,
    deleteProfileSuccess

} = userSlice.actions;
export default userSlice.reducer;