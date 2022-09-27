/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import { createSlice } from '@reduxjs/toolkit';

const state = {
  nickname: undefined,
  email: undefined,
  token: undefined,
  isAuth: false,
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
    changeAuth: (state) => {
      state.isAuth = !state.isAuth;
    },
  },
});

// Getters
export const getNickname = (state) => state.auth.nickname;
export const getToken = (state) => state.auth.token;
export const getEmail = (state) => state.auth.email;
export const isAuth = (state) => state.auth.isAuth;

// Actions
export const {
  setStoreNickname, setStoreToken, setStoreEmail, changeAuth,
} = authSlice.actions;

export default authSlice.reducer;
