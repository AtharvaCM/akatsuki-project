import { createSlice } from "@reduxjs/toolkit/";

export const HotelDetailsSlice = createSlice({
  name: "hotelDetails",
  initialState: {
    id: "",
    hotel_name: "",
    state: "",
    city: "",
    address: "",
    description: "",
    features: [],
    ratings: 0,
    reviews_count: 224,
    room_images: [],
    amenities: [],
  },
  reducers: {
    setHotelDetails: (state, action) => {
      // mutating state works!, becaure of 'Immer'
      state.id = action.payload.id;
      state.hotel_name = action.payload.name;
      state.state = action.payload.state;
      state.city = action.payload.city;
      state.address = action.payload.address;
      state.description = action.payload.description;
      state.features = action.payload.features;
      state.ratings = action.payload.ratings;
      state.reviews_count = action.payload.reviews_count;
      state.room_images = action.payload.room_images;
      state.amenities = action.payload.amenities;
    },
  },
});

// this is for dispatch
export const { setHotelDetails } = HotelDetailsSlice.actions;

// this is for configureStore
export default HotelDetailsSlice.reducer;
