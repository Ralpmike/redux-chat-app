import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import type { Post } from "../posts/postSlice"
import axios from "axios"

export type { Post }


export const apiSlice = createApi({
  reducerPath: 'api',
  tagTypes: ['Post'],
  baseQuery: fetchBaseQuery({
    baseUrl: '/fakeApi',
  }),

  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => '/posts',
      providesTags: ['Post']
    }),
    getPost: builder.query<Post, string>({
      query: (postId) => `/posts/${postId}`
    }),
    // addNewPost: builder.mutation<Post, NewPost>({
    //   query: initialPost => ({
    //     url: '/posts',
    //     method: 'POST',
    //     body: initialPost
    //   }),
    //   invalidatesTags: ['Post']
    // })
  }),

})

export const { useGetPostsQuery, useGetPostQuery } = apiSlice



const instance = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    'x-api-key': process.env.DOGS_API_KEY,
    'Content-Type': 'application/json'
  },
  timeout: 10000,
})


export default instance