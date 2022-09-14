import { createSlice } from "@reduxjs/toolkit/";
import dayjs from "dayjs";

export const searchHotelSlice = createSlice({
  name: "searchHotel",
  initialState: {
    location: null,
    checkInDate: JSON.stringify(dayjs().add(1, "day")),
    checkOutDate: JSON.stringify(dayjs().add(3, "day")),
  },
  reducers: {
    updateSearchParams: (state, action) => {
      // mutating state works!, becaure of 'Immer'

      state.location = action.payload.location;
      state.checkInDate = action.payload.checkInDate;
      state.checkOutDate = action.payload.checkOutDate;
    },
  },
});

// this is for dispatch
export const { updateSearchParams } = searchHotelSlice.actions;

// this is for configureStore
export default searchHotelSlice.reducer;
