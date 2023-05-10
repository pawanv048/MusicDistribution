// This folder contains your Redux reducers. Each file represents a specific 
// slice of your application state, and index.js 
// combines all of your reducers into a single reducer.


import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  data: [],
  topSongs: [],
  activeList: 'updateRelease'
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  // not a reducer, it object to configure reducers
  reducers: {
    updateTitle: (state, action) => {
      state.title = action.payload;
    },
    updateData: (state, action) => {
      //console.log('updateData called with payload:', action.payload);
      state.data = action.payload;
    },
    updateTopSongs: (state, action) => {
      state.topSongs = action.payload;
    },
    setActiveList: (state, action) => {
      state.activeList = action.payload;
    }
  },
});
//updateData

// Action creators generated for each case reducer function.
export const { 
  updateTitle, 
  updateData, 
  updateTopSongs, 
  setActiveList 
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
