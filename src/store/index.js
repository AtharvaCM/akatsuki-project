// redux store configuration file

import { configureStore } from "@reduxjs/toolkit";

// slice reducers
import searchHotelReducer from "../store/searchHotelSlice";
import roomPriceReducer from "../store/roomTypeSlice";
import hotelDetailsReducer from "../store/hotelDetailsSlice";
import bookingDetailsReducer from "../store/bookingDetailsSlice";

export default configureStore({
  reducer: {
    searchHotel: searchHotelReducer,
    roomPrice: roomPriceReducer,
    hotelDetails: hotelDetailsReducer,
    bookingDetails: bookingDetailsReducer,
  },
});
