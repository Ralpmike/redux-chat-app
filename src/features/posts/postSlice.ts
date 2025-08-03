import { createSlice, nanoid } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { PayloadAction } from "@reduxjs/toolkit";



export interface Post {
  id: string;
  title: string;
  content: string
}


//? Create an initial state value for the reducer, with that type
const initialState: Post[] = [
  { id: '1', title: 'First Post!', content: 'Hello!' },
  { id: '2', title: 'Second Post', content: 'More text' }
]

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer: (state, action: PayloadAction<Post>) => {
        state.push(action.payload)
      },
      prepare: (title: string, content: string) => {
        return {
          payload: {
            id: nanoid(),
            title,
            content
          }
        }
      }

    },
    postUpdated: (state, action: PayloadAction<Post>) => {
      const { id, title, content } = action.payload

      const existingPost = state.find(post => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    }
  },
  selectors: {
    selectAllPosts: postsState => postsState,
    selectPostById: (postsState, postId: string) => postsState.find(post => post.id === postId)
  }
})



export const { selectAllPosts, selectPostById } = postsSlice.selectors
//? replacing selectors standalone functions

// export const selectAllPosts = ((state: RootState) => state.posts)

// export const selectPostById = ((state: RootState, postId: string) => state.posts.find(post => { post.id === postId }))

export const { postAdded, postUpdated } = postsSlice.actions



export default postsSlice.reducer
