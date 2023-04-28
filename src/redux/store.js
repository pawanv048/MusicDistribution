// This folder contains your Redux store configuration. configureStore.js
// exports a configured Redux store with any middleware or enhancers you need.


import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { getDrawerApi } from './DrawerApiCall';
import { dashboardSlice } from './reducers';
import { userSlice } from './userSlice';

// export const useGetTopReleasesQuery = api.endpoints.getTopReleases.useQuery;


export const store = configureStore({
  reducer: {
    dashboard: dashboardSlice.reducer,
    user: userSlice.reducer,
    [getDrawerApi.reducerPath]: getDrawerApi.reducer
    // [getDrawerapis.reducerPath]: getDrawerapis.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(getDrawerApi.middleware),
});

setupListeners(store.dispatch)

export default store;