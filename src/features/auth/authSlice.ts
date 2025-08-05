import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  username: string | null
}

const initialState: AuthState = {
  username: 'Raphael',
}


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoggedIn: (state, action: PayloadAction<AuthState>) => {
      state.username = action.payload.username
    },
    userLoggedOut: state => {
      state.username = null
    }
  }
})

const { userLoggedIn, userLoggedOut } = authSlice.actions

export default authSlice.reducer