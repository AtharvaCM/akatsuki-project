import { createSlice } from "@reduxjs/toolkit/";

export const roomPriceSlice = createSlice({
  name: "roomPrice",
  initialState: {
    roomType: "",
    roomOriginalPrice: 0,
    roomPrice: 0,
  },
  reducers: {
    updateRoomPrice: (state, action) => {
      // mutating state works!, becaure of 'Immer'

      state.roomType = action.payload.roomType;
      state.roomOriginalPrice = action.payload.roomOriginalPrice;
      state.roomPrice = action.payload.roomPrice;
    },
  },
});

// this is for dispatch
export const { updateRoomPrice } = roomPriceSlice.actions;

// this is for configureStore
export default roomPriceSlice.reducer;
