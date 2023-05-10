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
    })
  })
});

export const { useGetTopReleasesQuery, useGetTopSongsQuery } = getDrawerApi;