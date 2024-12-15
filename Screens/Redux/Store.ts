import { configureStore } from '@reduxjs/toolkit';
import StateSlice from './StateSlice';

const store = configureStore({
  reducer: {
    state:StateSlice,
  }, // Add your reducers here
});

export default store; // Export the store

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
