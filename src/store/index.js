// redux store configuration file

import { configureStore } from "@reduxjs/toolkit";

// slice reducers
import searchHotelReducer from "../store/searchHotelSlice";
import loginReducer from "../store/loginSlice";
import roomPriceReducer from "../store/roomTypeSlice";
import hotelDetailsReducer from "../store/hotelDetailsSlice";
import bookingDetailsReducer from "../store/bookingDetailsSlice";
import hotelFiltersReducer from "../store/hotelFiltersSlice";

export default configureStore({
  reducer: {
    searchHotel: searchHotelReducer,
    roomPrice: roomPriceReducer,
    hotelDetails: hotelDetailsReducer,
    bookingDetails: bookingDetailsReducer,
    hotelFilters: hotelFiltersReducer,
    login: loginReducer,
  },
});
