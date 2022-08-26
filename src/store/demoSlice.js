import { createSlice } from "@reduxjs/toolkit/";

export const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: 1,
        text: action.payload,
      };

      // mutating state works!, becaure of 'Immer'
      state.push(todo);
    },
  },
});

// this is for dispatch
export const { addTodo } = todoSlice.actions;

// this is for configureStore
export default todoSlice.reducer;
