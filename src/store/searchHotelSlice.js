import { createSlice } from "@reduxjs/toolkit/";

export const searchHotelSlice = createSlice({
  name: "searchHotel",
  initialState: {
    location: null,
    checkInDate: null,
    checkOutDate: null,
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
