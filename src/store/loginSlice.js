import { createSlice } from "@reduxjs/toolkit/";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    username: localStorage.getItem("username"),
    token: localStorage.getItem("token"),
    userId: localStorage.getItem("userId"),
    isAuthenticated: localStorage.getItem("isAuthenticated"),
    avatar: localStorage.getItem("avatar"),
  },
  reducers: {
    setLogin: (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.username = action.payload.username;
      state.userId = action.payload.userId;
      state.token = action.payload.token;
      state.avatar = action.payload.avatar;
    },
  },
});

export const { setLogin } = loginSlice.actions;

export default loginSlice.reducer;
