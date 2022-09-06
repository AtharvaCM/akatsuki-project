import React, { useState } from "react";
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

// custom hooks for API
import { useAxios } from "../../hooks/useAxios";

// react router
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/constants/routingPathConstants";

// List of locations will come from backend
const DummyLocationOptions = [
  "Pune",
  "Mumbai",
  "Delhi",
  "Dehradun",
  "Mysore",
  "Manali",
];

const URL = "http://localhost:5000/api/v1/hotels/";

const SearchWidget = () => {
  // React Hooks
  const [location, setLocation] = useState(null);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  const { data, error, loaded, callAPI } = useAxios();

  const navigate = useNavigate();

  // Functions
  const searchSubmitHandler = (e) => {
    console.log(location, checkInDate, checkOutDate);
    e.preventDefault();
    // call API
    callAPI(`${URL}?location=${location}`);
  };

  if (error) {
    console.log(error);
  }

  // if API call finished
  if (loaded) {
    navigate(ROUTES.HOTEL_LIST, { replace: false, state: data });
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
                  options={DummyLocationOptions}
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
                      setCheckInDate(newCheckInDate);
                      // If Check-In date crosses check-Out date
                      // Then set Check-Out date tommorow of Check-in Date
                      if (
                        dayjs(newCheckInDate).diff(
                          dayjs(checkOutDate),
                          "day"
                        ) >= 0
                      ) {
                        setCheckOutDate(dayjs(newCheckInDate).add(1, "day"));
                      }
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
