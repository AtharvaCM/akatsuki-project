// redux store configuration file

import { configureStore } from "@reduxjs/toolkit";

// slice reducers
import todoReducer from "../store/demoSlice";
import searchHotelReducer from "../store/searchHotelSlice";
import roomPriceReducer from "../store/roomTypeSlice";
import hotelDetailsReducer from "../store/hotelDetailsSlice";

export default configureStore({
  reducer: {
    todos: todoReducer,
    searchHotel: searchHotelReducer,
    roomPrice: roomPriceReducer,
    hotelDetails: hotelDetailsReducer,
  },
});
