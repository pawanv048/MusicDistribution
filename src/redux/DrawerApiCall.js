import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const getDrawerApi = createApi({
  reducerPath: 'getDrawerapis',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://84.16.239.66' }),
  endpoints: (builder) => ({
    getTopReleases: builder.query({
      query: () => ({
        url: '/GetTopReleases',
        method: 'get'
      })
    }),
    getTopSongs: builder.query({
      query: () => ({
        url: '/GetTopSongs',
        method: 'get'
      })
    }),
    addPurchaseDetail: builder.mutation({
      query: (data) => ({
        url: '/AddPurchesDetail',
        method: 'POST',
        body: data
      })
    })
  })
});

export const { 
  useGetTopReleasesQuery, 
  useGetTopSongsQuery, 
  useAddPurchaseDetailMutation 
} = getDrawerApi;