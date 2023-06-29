
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import layoutReducer from '../slices/layouts/reducer'
import teamReducer from '../slices/team/reducer'
export const store = configureStore({
    devTools:true,
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    Layout: layoutReducer,
    Team : teamReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;