import { createSlice } from "@reduxjs/toolkit/";

export const BookingDetailsSlice = createSlice({
  name: "bookingDetails",
  initialState: {
    user_id: null,
    room_type: null,
    check_in_date: null,
    check_out_date: null,
    amount: null,
    number_of_rooms: null,
    hotel_id: null,
    room_id: null,
  },
  reducers: {
    setBookingDetails: (state, action) => {
      // mutating state works!, becaure of 'Immer'
      state.user_id = action.payload.user_id;
      state.room_type = action.payload.room_type;
      state.check_in_date = action.payload.check_in_date;
      state.check_out_date = action.payload.check_out_date;
      state.amount = action.payload.amount;
      state.number_of_rooms = action.payload.number_of_rooms;
      state.hotel_id = action.payload.hotel_id;
      state.room_id = action.payload.room_id;
    },
  },
});

// this is for dispatch
export const { setBookingDetails } = BookingDetailsSlice.actions;

// this is for configureStore
export default BookingDetailsSlice.reducer;
