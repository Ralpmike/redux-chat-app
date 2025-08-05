import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from '@/features/api/apiSlice'
import postsReducer from '@/features/posts/postSlice'
import usersReducer from '@/features/users/usersSlice'
import authReducer from '@/features/auth/authSlice'

// import { ListenerMiddleware } from './listenerMiddleware'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    users: usersReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  // middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(ListenerMiddleware.middleware).concat(apiSlice.middleware)
})

export type AppStore = typeof store;

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>