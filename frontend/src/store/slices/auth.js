/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import { createSlice } from '@reduxjs/toolkit';

const state = {
  nickname: undefined,
  email: undefined,
  token: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: state,
  reducers: {
    setStoreNickname: (state, action) => {
      state.nickname = action.payload;
    },
    setStoreToken: (state, action) => {
      state.token = action.payload;
    },
    setStoreEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

// Getters
export const getNickname = (state) => state.auth.nickname;
export const getToken = (state) => state.auth.token;
export const getEmail = (state) => state.auth.email;

// Actions
export const { setStoreNickname, setStoreToken, setStoreEmail } = authSlice.actions;

export default authSlice.reducer;
