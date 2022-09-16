import { createSlice } from "@reduxjs/toolkit/";

export const hotelFiltersSlice = createSlice({
  name: "hotelFilters",
  initialState: {
    add: false,
    popular_filters: [],
    filtered_hotel_count: 0,
    minPrice: 10,
    maxPrice: 500,
  },
  reducers: {
    setPopularFilter: (state, action) => {
      // mutating state works!, becaure of 'Immer'
      action.payload.add
        ? state.popular_filters.push(action.payload.popular_filter)
        : state.popular_filters.pop(action.payload.popular_filter);
    },

    setPriceRangeFilter: (state, action) => {
      state.minPrice = action.payload.minPrice;
      state.maxPrice = action.payload.maxPrice;
    },
  },
});

// this is for dispatch
export const { setPopularFilter, setPriceRangeFilter } =
  hotelFiltersSlice.actions;

// this is for configureStore
export default hotelFiltersSlice.reducer;
