import React, { useState } from "react";
//MUI
import {
  Typography,
  TextField,
  Divider,
  Card,
  Chip,
  Grid,
  Box,
  IconButton,
  Checkbox,
  Button,
} from "@mui/material";

import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";

// Date Imports
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

// CSS
import styles from "./HotelBookingCard.module.css";

const HotelBookingCard = () => {
  // Dummy data
  const roomPrice = 720;
  const extraFeatures = [
    {
      feature: "Allow to bring pet",
      price: 15,
    },
    { feature: "Lunch per person per day", price: 24 },
    { feature: "Parking", price: 5 },
    { feature: "Extra Pillow", price: 0 },
  ];
  // React Hooks
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guestsCount, setGuestsCount] = useState(1);
  const [roomsCount, setRoomsCount] = useState(1);
  const [extraFeatureAmount, setExtraFeatureAmount] = useState(0);
  const [numberOfDays, setNumberOfDays] = useState(1);
  const [totalAmount, setTotalAmount] = useState(roomPrice * numberOfDays);

  const decrementGuestCount = () => {
    if (guestsCount > 1) {
      setGuestsCount((prevState) => +prevState - 1);
    }
  };

  const incrementGuestCount = () => {
    setGuestsCount((prevState) => +prevState + 1);
  };

  const decrementRoomsCount = () => {
    if (roomsCount > 1) {
      setRoomsCount((prevState) => +prevState - 1);
      setTotalAmount((prevState) => prevState - roomPrice * numberOfDays);
    }
  };

  const incrementRoomsCount = () => {
    setRoomsCount((prevState) => +prevState + 1);
    setTotalAmount((prevState) => prevState + roomPrice * numberOfDays);
  };

  const guestsInputOnChangeHandler = (e) => {
    setGuestsCount(
      e.target.value.length === 0 || e.target.value < 1 ? "" : e.target.value
    );
  };

  const roomInputOnChangeHandler = (e) => {
    let newRoomsCount =
      e.target.value.length === 0 || e.target.value < 1 ? "" : e.target.value;

    setRoomsCount(newRoomsCount);
    setTotalAmount(
      extraFeatureAmount + newRoomsCount * +roomPrice * numberOfDays
    );
  };

  const ExtraFeaturesChangeHandler = (e) => {
    if (e.target.checked) {
      setExtraFeatureAmount(
        (prevState) => prevState + +e.target.name * numberOfDays
      );
      setTotalAmount((prevState) => prevState + +e.target.name * numberOfDays);
    } else {
      setExtraFeatureAmount(
        (prevState) => prevState - +e.target.name * numberOfDays
      );
      setTotalAmount((prevState) => prevState - +e.target.name * numberOfDays);
    }
  };

  const datesChangeHandler = (isCheckIn, newDate) => {
    if (isCheckIn) {
      setCheckInDate(newDate);
      // If Check-In date crosses check-Out date
      // Then set Check-Out date tommorow of Check-in Date
      var days = dayjs(newDate).diff(dayjs(checkOutDate), "day");
      if (days >= 0) {
        setCheckOutDate(dayjs(newDate).add(1, "day"));
      }
      days = days >= 0 || !isNaN(days) ? Math.abs(days) : 1;
      setNumberOfDays(days);
    } else {
      days = dayjs(newDate).diff(dayjs(checkInDate), "day");
      setCheckOutDate(newDate);
      setNumberOfDays(days);
    }
    setTotalAmount(
      roomPrice * (isNaN(days) ? 1 : days) * roomsCount + extraFeatureAmount
    );
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          padding: "5%",
          background: "#FFFFFF",
          border: "1px solid #D1CECE",
          borderRadius: "30px",
        }}
        className={styles["booking_card"]}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Grid container className={styles["card_header"]}>
            <Grid item xs={6} md={6}>
              <Typography variant="h6">
                ${roomPrice}
                <span className={styles["night_text"]}>/night</span>
              </Typography>
            </Grid>
            <Grid item xs={3} md={3}>
              <Typography className={styles["discounted_price"]}>
                $576
              </Typography>
            </Grid>
            <Grid item xs={3} md={3}>
              <Chip
                label="20% OFF"
                color="primary"
                className={styles["discount_chip"]}
              />
            </Grid>
          </Grid>
        </Box>
        <Divider />
        <form onSubmit={submitHandler}>
          <Box className={styles["dates_container"]} sx={{ flexGrow: 1 }}>
            <Grid container className={styles["card_header"]}>
              <Grid item xs={5} md={5}>
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
                      datesChangeHandler(true, newCheckInDate);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} required={true} />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={2} md={2}></Grid>
              <Grid item xs={5} md={5}>
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
                      datesChangeHandler(false, newCheckOutDate);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} required={true} />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </Box>

          <Box>
            <Grid container className={styles["card_header"]}>
              <Grid item xs={2}>
                <IconButton onClick={decrementGuestCount}>
                  <IndeterminateCheckBoxIcon
                    fontSize="large"
                    color="info"
                  ></IndeterminateCheckBoxIcon>
                </IconButton>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  sx={{ marginTop: "4%", width: "100%" }}
                  id="outlined-number"
                  label="Number of Guests"
                  type="number"
                  required
                  value={guestsCount}
                  onChange={guestsInputOnChangeHandler}
                />
              </Grid>
              <Grid item xs={2}>
                <IconButton onClick={incrementGuestCount}>
                  <AddBoxIcon fontSize="large" color="info"></AddBoxIcon>
                </IconButton>
              </Grid>
            </Grid>

            <Grid container className={styles["card_header"]}>
              <Grid item xs={2}>
                <IconButton
                  onClick={decrementRoomsCount}
                  disabled={checkOutDate === null}
                >
                  <IndeterminateCheckBoxIcon
                    fontSize="large"
                    color="info"
                  ></IndeterminateCheckBoxIcon>
                </IconButton>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  sx={{ marginTop: "4%", width: "100%" }}
                  id="outlined-number"
                  label="Number of Rooms"
                  type="number"
                  value={roomsCount}
                  disabled={checkOutDate === null}
                  required
                  onChange={roomInputOnChangeHandler}
                />
              </Grid>
              <Grid item xs={2}>
                <IconButton
                  onClick={incrementRoomsCount}
                  disabled={checkOutDate === null}
                >
                  <AddBoxIcon fontSize="large" color="info"></AddBoxIcon>
                </IconButton>
              </Grid>
            </Grid>
          </Box>

          <Typography className={styles["night_text"]}>
            Extra Features
          </Typography>
          <Box>
            {extraFeatures.map((extraFeature) => (
              <Grid
                key={extraFeature.feature}
                container
                className={styles["card_header"]}
                sx={{ marginBottom: "0" }}
              >
                <Grid item xs={2} md={2}>
                  <Checkbox
                    name={extraFeature.price.toString()}
                    onChange={ExtraFeaturesChangeHandler}
                  ></Checkbox>
                </Grid>
                <Grid item xs={8} md={8}>
                  {extraFeature.feature}
                </Grid>
                <Grid className={styles["night_text"]} item xs={2} md={2}>
                  ${extraFeature.price}
                </Grid>
              </Grid>
            ))}
          </Box>
          <Grid container>
            <Grid item xs={9}>
              <Typography className={styles["night_text"]}>
                Total Payment
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h6">${totalAmount}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                sx={{ width: "100%", margin: "5% auto" }}
                type="submit"
                variant="contained"
                size="large"
                color="primary"
                className={styles["booknow_btn"]}
              >
                Book Now
              </Button>
            </Grid>
          </Grid>
        </form>
        <Typography className={styles["cardfooter"]}>
          You will not get charged yet
        </Typography>
      </Card>
    </>
  );
};

export default HotelBookingCard;
