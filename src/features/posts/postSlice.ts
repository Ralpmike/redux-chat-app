import { createSlice, nanoid } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { PayloadAction } from "@reduxjs/toolkit";
import { sub } from 'date-fns'
import { userLoggedOut } from "../auth/authSlice";
import { client } from "@/api/client";

export interface Reactions {
  thumbsUp: number
  tada: number
  heart: number
  rocket: number
  eyes: number
}
export interface Post {
  id: string;
  title: string;
  content: string
  user: string | null
  comments: string[]
  date: string
  reactions: Reactions
}


export type ReactionName = keyof Reactions



//? Create an initial state value for the reducer, with that type
type PostUpdate = Pick<Post, 'id' | 'title' | 'content'>
const initialReactions: Reactions = {
  thumbsUp: 0,
  tada: 0,
  heart: 0,
  rocket: 0,
  eyes: 0
}
interface PostState {
  posts: Post[],
  status: 'idle' | 'pending' | 'succeeded' | 'failed',
  error: string | null
}

import { createAppAsyncThunk } from "@/app/hooks/hooks";

export const fetchPosts = createAppAsyncThunk(
  'posts/fetchPosts', async () => {
    const response = await client.get<Post[]>('/fakeApi/posts')

    return response.data
  },
  {
    condition(arg, thunkApi) {
      const postsStatus = selectPostStatus(thunkApi.getState())
      if (postsStatus !== 'idle') {
        return false
      }
    }
  }
)

// const initialState: Post[] = [
//   { id: '1', title: 'First Post!', content: 'Hello!', user: '0', date: sub(new Date(), { minutes: 10 }).toISOString(), reactions: initialReactions },
//   { id: '2', title: 'Second Post', content: 'More text', user: '2', date: sub(new Date(), { minutes: 10 }).toISOString(), reactions: initialReactions },
// ]

const initialState: PostState = {
  posts: [],
  status: 'idle',
  error: null
}

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer: (state, action: PayloadAction<Post>) => {
        state.posts.push(action.payload)
      },
      prepare: (title: string, content: string, userId: string | null) => { //?to refine the action.payload
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            user: userId,
            reactions: initialReactions,
            comments: []
          }
        }
      }

    },
    postUpdated: (state, action: PayloadAction<PostUpdate>) => {
      const { id, title, content } = action.payload

      const existingPost = state.posts.find(post => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },

    reactionAdded: (state, action: PayloadAction<{ postId: string, reaction: ReactionName }>) => {
      const { postId, reaction } = action.payload
      const existingPost = state.posts.find(post => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    }
  },
  extraReducers: builder => {
    builder.addCase(userLoggedOut, state => {
      return initialState
    })
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'pending'
      }).addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.status = 'succeeded'
        state.posts = action.payload
      }).addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Something went wrong'
      })
  },
  selectors: {
    selectAllPosts: postsState => postsState,
    selectPostById: (postsState, postId: string) => postsState.posts.find(post => post.id === postId),
    selectPostStatus: (postsState) => postsState.status,
    selectPostsError: postsState => postsState.error
  }
})



export const { selectAllPosts, selectPostById, selectPostStatus, selectPostsError } = postsSlice.selectors
//? replacing selectors standalone functions

// export const selectAllPosts = ((state: RootState) => state.posts)

// export const selectPostById = ((state: RootState, postId: string) => state.posts.find(post => { post.id === postId }))

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions



export default postsSlice.reducer
