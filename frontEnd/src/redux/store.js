import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import thunkMiddleware from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunkMiddleware],
  });

const persistor = persistStore(store)
export {store, persistor}
