// This folder contains your Redux store configuration. configureStore.js
// exports a configured Redux store with any middleware or enhancers you need.



import { configureStore } from '@reduxjs/toolkit';
import { dashboardSlice } from './reducers';

export const store = configureStore({
  reducer: {
    dashboard: dashboardSlice.reducer,
  },
});