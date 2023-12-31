import { createSlice } from '@reduxjs/toolkit';

// Define the initial state of the auth slice
const initialState = {
  currentUser: null,
  loading: false,
  error: null,
};

// Create the authSlice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Reducer for handling the start of a sign-in process
    signInStart: (state) => {
      state.loading = true;
    },
    // Reducer for handling a successful sign-in
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    // Reducer for handling a sign-in failure
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    signOutUserStart: (state) => {
      state.loading = true;
    },
    signOutUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    signOutUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// Extract action creators from the authSlice
export const { signInStart, signInSuccess, signInFailure,
  signOutUserStart, signOutUserSuccess,signOutUserFailure
 } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
