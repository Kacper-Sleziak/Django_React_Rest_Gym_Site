import { createSlice } from '@reduxjs/toolkit'
import { store } from '../store'

const state = {
  nickname: "",
  email: "",
  token: "",
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: state,
  reducers: {
    setStoreNickname: (state, action) => {
      state.nickname = action.payload
    },
    setStoreToken: (state, action) => {
      state.token = action.payload
    },
    setStoreEmail: (state, action) => {
      state.email = action.payload
    },
  },
})

// Getters 
export const getNickname = (state) => state.auth.nickname
export const getToken = (state) => state.auth.token
export const getEmail = (state) => state.auth.email

// Actions
export const { setStoreNickname, setStoreToken, setStoreEmail } = authSlice.actions

export default authSlice.reducer
