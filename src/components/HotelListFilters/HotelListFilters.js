import React, { useState } from "react";
import PropTypes from "prop-types";
// router
import { useNavigate } from "react-router-dom";

import {
  Autocomplete,
  TextField,
  Divider,
  Checkbox,
  Box,
  Grid,
  Typography,
} from "@mui/material";

// redux
import { useDispatch } from "react-redux";

// Routes
import { ROUTES } from "../../utils/constants/routingPathConstants";

// actions
import {
  setPopularFilter,
  setAmenitiesFilter,
  setPriceRangeFilter,
} from "../../store/hotelFiltersSlice";

import Slider from "@mui/material/Slider";

// CSS Imports
// import styles from "./HotelListFilters.module.css";

const POPULAR_FILTERS = ["Mountain View", "City View", "Sound Proof", "Patio"];

// const PROPERTY_TYPE = ["Hotels", "Appartments", "Resort"];

const FACILITIES = [
  "Outdoor Sports",
  "Barbeque",
  "Living Room",
  "Bath Tub",
  "Bar",
  "Spa",
  "Baby Changing Station",
];

// const [selectedPopularFilters, setSelectedPopularFilters] = useState([]);

const HotelListFilters = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { popular_filters } = useSelector((state) => state.hotelFilters);

  // console.log("dispatch", popular_filters);
  const popularFiltersChangeHandler = (e) => {
    if (e.target.checked) {
      dispatch(
        setPopularFilter({
          add: true,
          popular_filter: e.target.name,
        })
      );
    } else {
      dispatch(
        setPopularFilter({
          add: false,
          popular_filter: e.target.name,
        })
      );
    }
  };

  const facilitiesFiltersChangeHandler = (e) => {
    if (e.target.checked) {
      dispatch(
        setAmenitiesFilter({
          add: true,
          amenities_filter: e.target.name,
        })
      );
    } else {
      dispatch(
        setAmenitiesFilter({
          add: false,
          amenities_filter: e.target.name,
        })
      );
    }
  };

  const propertySearchHandler = (hotel_name) => {
    const hotel_id = props.hotelIdList[props.hotelNameList.indexOf(hotel_name)];
    // Redirect to hotel detail page
    navigate(`${ROUTES.HOTEL_DETAILS}/${hotel_id}`);
  };

  const [priceRange, setPriceRange] = useState([50, 300]);

  const priceRangeChangeHandler = (event, newValue) => {
    setPriceRange(newValue);
    dispatch(
      setPriceRangeFilter({
        priceRangeMin: newValue[0],
        priceRangeMax: newValue[1],
      })
    );
  };
  return (
    <>
      <Typography variant="h6">Search Location or Property</Typography>
      <Autocomplete
        disablePortal
        options={props.hotelNameList}
        sx={styles.input}
        onChange={(e, value) => propertySearchHandler(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search Location or Property"
            sx={styles.label}
          />
        )}
      />
      <Typography variant="h6">Popular Filters</Typography>
      <Box>
        {POPULAR_FILTERS.map((popFilter) => (
          <Grid
            key={popFilter}
            container
            sx={{ marginBottom: "0%", alignItems: "center" }}
          >
            <Grid item xs={2} md={2}>
              <Checkbox
                name={popFilter}
                onChange={popularFiltersChangeHandler}
              ></Checkbox>
            </Grid>
            <Grid item xs={10} md={10}>
              {popFilter}
            </Grid>
          </Grid>
        ))}
      </Box>
      <Divider sx={styles.divider} />
      <Typography variant="h6" sx={{ marginBottom: "15%" }}>
        Price Range Per Night
      </Typography>
      <Slider
        getAriaLabel={() => "Minimum distance"}
        value={priceRange}
        onChange={priceRangeChangeHandler}
        valueLabelDisplay="on"
        min={45}
        max={300}
        valueLabelFormat={(value) => <div>{value}</div>}
        // getAriaValueText={valuetext}
        disableSwap
      />
      <Divider sx={styles.divider} />
      {/* <Typography variant="h6">Property Type</Typography>
      <Box>
        {PROPERTY_TYPE.map((propertyType) => (
          <Grid
            key={propertyType}
            container
            sx={{ marginBottom: "0%", alignItems: "center" }}
          >
            <Grid item xs={2} md={2}>
              <Checkbox name={propertyType}></Checkbox>
            </Grid>
            <Grid item xs={10} md={10}>
              {propertyType}
            </Grid>
          </Grid>
        ))}
      </Box>
      <Divider sx={styles.divider} /> */}
      <Typography variant="h6">Facilities</Typography>
      <Box>
        {FACILITIES.map((facility) => (
          <Grid
            key={facility}
            container
            sx={{ marginBottom: "0%", alignItems: "center" }}
          >
            <Grid item xs={2} md={2}>
              <Checkbox
                name={facility}
                onChange={facilitiesFiltersChangeHandler}
              ></Checkbox>
            </Grid>
            <Grid item xs={10} md={10}>
              {facility}
            </Grid>
          </Grid>
        ))}
      </Box>
    </>
  );
};

const styles = {
  input: {
    backgroundColor: "#F0F1F2",
    borderRadius: "7px",
    cursor: "pointer",
    margin: "5% 0",
  },

  label: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "16px",
    lineHeight: "19px",
    color: "#000000",
  },

  divider: {
    margin: "5% 0",
  },
};

HotelListFilters.propTypes = {
  hotelNameList: PropTypes.array,
  hotelIdList: PropTypes.array,
};

export default HotelListFilters;
