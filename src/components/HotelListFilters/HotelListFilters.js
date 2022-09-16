import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

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
import { useSelector, useDispatch } from "react-redux";

// actions
import { setPopularFilter } from "../../store/hotelFiltersSlice";

import Slider from "@mui/material/Slider";

// CSS Imports
// import styles from "./HotelListFilters.module.css";

const POPULAR_FILTERS = ["Mountain View", "City View", "Sound Proof", "Patio"];

// const PROPERTY_TYPE = ["Hotels", "Appartments", "Resort"];

const FACILITIES = [
  "Outdoor Sports",
  "Barbeque",
  "Living Room",
  "Room Service",
  "Infinity Pool",
  "Spa",
];

// const [selectedPopularFilters, setSelectedPopularFilters] = useState([]);

const HotelListFilters = (props) => {
  const dispatch = useDispatch();

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
    // console.log("live", selectedPopularFilters);
  };

  // useEffect(() => {

  // }, [selectedPopularFilters]);

  const [priceRange, setPriceRange] = useState([50, 300]);

  const priceRangeChangeHandler = (event, newValue) => {
    setPriceRange(newValue);
  };
  return (
    <>
      <Typography variant="h6">Search Location or Property</Typography>
      <Autocomplete
        disablePortal
        options={props.hotelNameList}
        sx={styles.input}
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
        max={2000}
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
              <Checkbox name={facility}></Checkbox>
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
};

export default HotelListFilters;
