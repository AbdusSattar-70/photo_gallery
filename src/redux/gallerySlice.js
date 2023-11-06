import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  urls: [],
  loading: false,
  error: null,
  progress: 0,
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
      state.progress = 0;
    },
    uploadFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateProgress: (state, action) => {
      state.progress = action.payload;
    },
    deletedStart: (state) => {
      state.loading = true;
    },
    deletedSuccess: (state, action) => {
      state.urls = action.payload;
      state.loading = false;
      state.error = null;
    },

    postSuccess: (state, action) => {
      state.urls = action.payload;
      state.loading = false;
      state.error = null;
    },
    getSuccess: (state, action) => {
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

const {
  uploadstart,
  uploadSuccess,
  uploadFailure,
  deletedSuccess,
  deletedFailure,
  deletedStart,
  updateProgress,
  postSuccess,
  getSuccess
} = gallerySlice.actions;

export {
  uploadstart,
  uploadSuccess,
  uploadFailure,
  deletedSuccess,
  deletedFailure,
  deletedStart,
  updateProgress,
  postSuccess,
  getSuccess
};

export default gallerySlice.reducer;
