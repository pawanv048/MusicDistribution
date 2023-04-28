// This folder contains your Redux reducers. Each file represents a specific 
// slice of your application state, and index.js 
// combines all of your reducers into a single reducer.


import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  data: null
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  // not a reducer, it object to configure reducers
  reducers: {
    updateTitle: (state, action) => {
      state.title = action.payload;
    },
    getTopReleaseData: (state, action) => {
      state.data = action.payload;
    }
  },
});


// Action creators generated for each case reducer function.
export const { updateTitle, getTopReleaseData } = dashboardSlice.actions;
export default dashboardSlice.reducer;
