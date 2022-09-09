import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  TextField,
  FormGroup,
  Button,
  Grid,
} from "@mui/material";

// Date Imports
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

// CSS Imports
import styles from "./SearchWidget.module.css";

// react router
import { useNavigate } from "react-router-dom";

// path constants
import { ROUTES } from "../../utils/constants/routingPathConstants";

// redux
import { useDispatch, useSelector } from "react-redux";

// actions
import { updateSearchParams } from "../../store/searchHotelSlice";

// custom Hooks
import { useAxios } from "../../hooks/useAxios";

const locationListURL = `${process.env.REACT_APP_FLASK_DOMAIN}api/v1/hotels/locations`;

const SearchWidget = () => {
  const dispatch = useDispatch();

  const { error, loaded, data, callAPI } = useAxios();

  const {
    location: searchedLocation,
    checkInDate: searchedCheckInDate,
    checkOutDate: searchedCheckOutDate,
  } = useSelector((state) => state.searchHotel);

  // React Hooks
  const [location, setLocation] = useState(searchedLocation);
  const [checkInDate, setCheckInDate] = useState(
    searchedCheckInDate ? JSON.parse(searchedCheckInDate) : null
  );
  const [checkOutDate, setCheckOutDate] = useState(
    searchedCheckOutDate ? JSON.parse(searchedCheckOutDate) : null
  );

  const navigate = useNavigate();

  // Functions
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    console.log(location, checkInDate, checkOutDate);
    dispatch(
      updateSearchParams({
        location: location,
        checkInDate: JSON.stringify(checkInDate) ?? null,
        checkOutDate: JSON.stringify(checkOutDate) ?? null,
      })
    );
    // call API
    navigate(ROUTES.HOTEL_LIST, {
      replace: false,
    });
  };

  const onChangeCheckInDate = (newCheckInDate) => {
    setCheckInDate(newCheckInDate);
    // If Check-In date crosses check-Out date
    // Then set Check-Out date tommorow of Check-in Date
    if (dayjs(newCheckInDate).diff(dayjs(checkOutDate), "day") >= 0) {
      setCheckOutDate(dayjs(newCheckInDate).add(1, "day"));
    }
  };

  useEffect(() => {
    // get list of locations
    callAPI(locationListURL);
  }, []);

  if (error) {
    console.log("error: ", error);
  }

  return (
    <>
      <div className={styles["searchwidget"]}>
        <form onSubmit={searchSubmitHandler}>
          <FormGroup>
            <Grid container spacing={3} rowSpacing={2}>
              <Grid item xs={12} md={4}>
                <Autocomplete
                  disablePortal
                  options={loaded ? data.data : []}
                  value={location}
                  className={styles["input"]}
                  onChange={(event, value) => {
                    setLocation(value);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required={true}
                      placeholder="Where do you want to travel?"
                      label="Location"
                      className={styles["label"]}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} sm={5} md={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    clearable={true}
                    label="Check in"
                    value={checkInDate}
                    minDate={dayjs().add(1, "day")}
                    inputFormat="DD/MM/YYYY"
                    placeholder="DD/MM/YYYY"
                    className={styles["input"]}
                    onChange={(newCheckInDate) => {
                      onChangeCheckInDate(newCheckInDate);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} required={true} />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={6} sm={5} md={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Check Out"
                    disabled={!checkInDate && true}
                    minDate={checkInDate && dayjs(checkInDate).add(1, "day")}
                    value={checkOutDate}
                    inputFormat="DD/MM/YYYY"
                    placeholder="DD/MM/YYYY"
                    className={styles["input"]}
                    onChange={(newCheckOutDate) => {
                      setCheckOutDate(newCheckOutDate);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} required={true} />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={2} md={2}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  color="primary"
                  className={styles["searchbtn"]}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </FormGroup>
        </form>
      </div>
    </>
  );
};

export default SearchWidget;
