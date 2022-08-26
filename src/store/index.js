// redux store configuration file

import { configureStore } from "@reduxjs/toolkit";

// slice reducers
import todoReducer from "../store/demoSlice";

export default configureStore({
  reducer: {
    todos: todoReducer,
  },
});
