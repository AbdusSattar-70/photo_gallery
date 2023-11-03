import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './authSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import galleryReducer from './gallerySlice';

const rootReducer = combineReducers({
  auth: userReducer,
  gallery: galleryReducer
 });

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

 const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
 const persistor = persistStore(store);

 export { store, persistor }