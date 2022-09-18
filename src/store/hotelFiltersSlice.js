import { createSlice } from "@reduxjs/toolkit/";

export const hotelFiltersSlice = createSlice({
  name: "hotelFilters",
  initialState: {
    add: false,
    popular_filters: [],
    priceRangeMin: 50,
    priceRangeMax: 300,
    amenities_filters: [],
  },
  reducers: {
    setPopularFilter: (state, action) => {
      // mutating state works!, becaure of 'Immer'
      action.payload.add
        ? state.popular_filters.push(action.payload.popular_filter)
        : state.popular_filters.pop(action.payload.popular_filter);
    },

    setPriceRangeFilter: (state, action) => {
      state.priceRangeMin = action.payload.priceRangeMin;
      state.priceRangeMax = action.payload.priceRangeMax;
    },

    setAmenitiesFilter: (state, action) => {
      // mutating state works!, becaure of 'Immer'
      action.payload.add
        ? state.amenities_filters.push(action.payload.amenities_filter)
        : state.amenities_filters.pop(action.payload.amenities_filter);
    },
  },
});

// this is for dispatch
export const { setPopularFilter, setPriceRangeFilter, setAmenitiesFilter } =
  hotelFiltersSlice.actions;

// this is for configureStore
export default hotelFiltersSlice.reducer;
