import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '../services/baseApi'; // ✅ import this, not featureApi/heroApi
import AuthReducer from './slices/authSlice'; // ✅ import your auth slice here

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer, // ✅ only baseApi here
    auth:AuthReducer, // ✅ add your auth slice here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware), // ✅ only baseApi here
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
