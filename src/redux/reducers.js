// This folder contains your Redux reducers. Each file represents a specific 
// slice of your application state, and index.js 
// combines all of your reducers into a single reducer.


import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: 'Best episodes of the week!'
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    updateTitle: (state, action) => {
      state.title = action.payload;
    },
  },
});

export default dashboardSlice.reducer;
