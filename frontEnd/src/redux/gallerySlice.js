import { createSlice } from '@reduxjs/toolkit';

// Define the initial state of the gallery slice
const initialState = {
  urls: [],
  loading: false,
  error: null,
};

const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    uploadstart: (state) => {
      state.loading = true;
    },
    uploadSuccess: (state, action) => {
      state.urls = action.payload;
      state.loading = false;
      state.error = null;
    },
    uploadFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deletedStart: (state) => {
      state.loading = true;
    },
    deletedSuccess: (state, action) => {
      state.urls = action.payload;
      state.loading = false;
      state.error = null;
    },
    deletedFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

  },
});

export const {
  uploadstart,
  uploadSuccess,
  uploadFailure,
  deletedSuccess,
  deletedFailure,
  deletedStart
 } = gallerySlice.actions;

// Export the reducer
export default gallerySlice.reducer;
