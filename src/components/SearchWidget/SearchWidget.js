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

// List of locations will come from backend
const DummyLocationOptions = [
  "Pune",
  "Mumbai",
  "Delhi",
  "Dehradun",
  "Mysore",
  "Manali",
];

const SearchWidget = () => {
  // React Hooks
  const [location, setLocation] = useState(null);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  // Functions
  const searchSubmitHandler = (e) => {
    console.log(location, checkInDate, checkOutDate);
    e.preventDefault();
  };

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
                      placeholder="Where do you want to travel?"
                      label="Location"
                      className={styles["label"]}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Check in"
                    value={checkInDate}
                    minDate={dayjs().add(1, "day")}
                    inputFormat="DD/MM/YYYY"
                    placeholder="DD/MM/YYYY"
                    className={styles["input"]}
                    onChange={(newCheckInDate) => {
                      setCheckInDate(newCheckInDate);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Check Out"
                    disabled={!checkInDate && true}
                    minDate={dayjs(checkInDate).add(1, "day")}
                    value={checkOutDate}
                    inputFormat="DD/MM/YYYY"
                    placeholder="DD/MM/YYYY"
                    className={styles["input"]}
                    onChange={(newCheckOutDate) => {
                      setCheckOutDate(newCheckOutDate);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={4} md={2}>
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
