// redux store configuration file

import { configureStore } from "@reduxjs/toolkit";

// slice reducers
import todoReducer from "../store/demoSlice";
import searchHotelReducer from "../store/searchHotelSlice";
import loginReducer from "../store/loginSlice";


export default configureStore({
  reducer: {
    todos: todoReducer,
    searchHotel: searchHotelReducer,
    login: loginReducer
  },
});
