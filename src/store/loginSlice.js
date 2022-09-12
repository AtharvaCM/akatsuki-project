import { createSlice } from "@reduxjs/toolkit/";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    username: "John",
    password: "john123",
    isLoggedIn: false,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.username = action.payload.username;
      state.password = action.payload.password;
    },
  },
});

export const {login} = loginSlice.actions;

export default loginSlice.reducer;
