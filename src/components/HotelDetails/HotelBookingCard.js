import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
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

import { useDispatch, useSelector } from "react-redux";
// actions
import { updateSearchParams } from "../../store/searchHotelSlice";
import { ROUTES } from "../../utils/constants/routingPathConstants";
// react router
import { useNavigate } from "react-router-dom";

// actions
import { updateRoomPrice } from "../../store/roomTypeSlice";
// custom hooks
// import { useAxios } from "../../hooks/useAxios";

// CSS
import styles from "./HotelBookingCard.module.css";

const HotelBookingCard = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Importing selected roomType and details from store
  const {
    roomPrice: selectedRoomPrice,
    available_rooms,
    roomOriginalPrice,
    isDiscountApplied,
  } = useSelector((state) => state.roomPrice);

  // Importing dates and location from store
  const {
    location: searchedLocation,
    checkInDate: searchedCheckInDate,
    checkOutDate: searchedCheckOutDate,
  } = useSelector((state) => state.searchHotel);

  // React Hooks
  const [checkInDate, setCheckInDate] = useState(
    searchedCheckInDate ? JSON.parse(searchedCheckInDate) : null
  );
  const [checkOutDate, setCheckOutDate] = useState(
    searchedCheckOutDate ? JSON.parse(searchedCheckOutDate) : null
  );

  // const [guestsCount, setGuestsCount] = useState(1);
  const [roomPrice, setRoomPrice] = useState(0);
  const [roomsCount, setRoomsCount] = useState(1);
  const [extraFeatureAmount, setExtraFeatureAmount] = useState(0);
  const [numberOfDays, setNumberOfDays] = useState(
    checkOutDate !== null
      ? dayjs(checkOutDate).diff(dayjs(checkInDate), "day")
      : 0
  );
  const [totalAmount, setTotalAmount] = useState(roomPrice * numberOfDays);

  // Number of Guest Incrementer and Decrementer
  // const decrementGuestCount = () => {
  //   if (guestsCount > 1) {
  //     setGuestsCount((prevState) => +prevState - 1);
  //   }
  // };

  // const incrementGuestCount = () => {
  //   setGuestsCount((prevState) => +prevState + 1);
  // };

  // const guestsInputOnChangeHandler = (e) => {
  //   setGuestsCount(
  //     e.target.value.length === 0 || e.target.value < 1 ? "" : e.target.value
  //   );
  // };

  // Decrement rooms count by 1 and update total payable amount
  const decrementRoomsCount = () => {
    if (roomsCount > 1) {
      setRoomsCount((prevState) => +prevState - 1);
      setTotalAmount(roomPrice * numberOfDays * (roomsCount - 1));
    }
  };

  // Increment rooms count by 1 and updates total payable amount
  const incrementRoomsCount = () => {
    if (roomsCount <= available_rooms - 1) {
      setRoomsCount((prevState) => +prevState + 1);

      setTotalAmount(roomPrice * numberOfDays * (roomsCount + 1));
    }
  };

  // When manually room count is changed
  const roomInputOnChangeHandler = (e) => {
    let newRoomsCount =
      e.target.value.length === 0 || e.target.value < 1 ? "" : e.target.value;

    if (newRoomsCount > available_rooms) {
      newRoomsCount = available_rooms;
    }

    setRoomsCount(newRoomsCount);
    setTotalAmount(
      extraFeatureAmount + newRoomsCount * +roomPrice * numberOfDays
    );
  };

  // Handles selection of extrafeatures and total amount payable
  const ExtraFeaturesChangeHandler = (e) => {
    if (e.target.checked) {
      setExtraFeatureAmount((prevState) => prevState + +e.target.name);
      setTotalAmount((prevState) => prevState + +e.target.name);
    } else {
      setExtraFeatureAmount((prevState) => prevState - +e.target.name);
      setTotalAmount((prevState) => prevState - +e.target.name);
    }
  };

  // calls Rooms list api when dates are changed also updates room types
  const callRoomListAPI = () => {
    if (checkInDate !== null && checkOutDate !== null) {
      dispatch(
        updateSearchParams({
          location: searchedLocation,
          checkInDate: JSON.stringify(checkInDate) ?? null,
          checkOutDate: JSON.stringify(checkOutDate) ?? null,
        })
      );
      dispatch(
        updateRoomPrice({
          roomType: "",
          available_rooms: 0,
          roomOriginalPrice: 0,
          roomPrice: 0,
        })
      );
      setTotalAmount(0);
      setRoomsCount(1);
    }
  };

  // Sets check in and check out date, number of days and total payable amount on dates changed
  const datesChangeHandler = (isCheckIn, newDate) => {
    var days = 0;
    if (isCheckIn) {
      setCheckInDate(newDate);
      // If Check-In date crosses check-Out date
      // Then set Check-Out date tommorow of Check-in Date
      days = dayjs(newDate).diff(dayjs(checkOutDate), "day");

      if (days >= 0) {
        setCheckOutDate(dayjs(newDate).add(1, "day"));
        days = 1;
      }
      days = days >= 0 || !isNaN(days) ? Math.abs(days) : 1;
      setNumberOfDays(days);
    } else {
      days = dayjs(newDate).diff(dayjs(checkInDate), "day");
      setCheckOutDate(newDate);
      setNumberOfDays(days);
    }

    setExtraFeatureAmount(extraFeatureAmount);
    setTotalAmount(
      roomPrice * (isNaN(days) ? 1 : days) * roomsCount + extraFeatureAmount
    );
  };

  // Booking confirmation sumit
  const submitHandler = (e) => {
    e.preventDefault();
    // Redirect to booking confirmation page
    if (checkInDate !== null && checkOutDate !== null) {
      navigate(`${ROUTES.BOOKING_CONFIRMATION}`);
    }
  };

  useEffect(() => {
    callRoomListAPI();
  }, [checkInDate, checkOutDate]);

  useEffect(() => {
    setRoomPrice(selectedRoomPrice === undefined ? 0 : selectedRoomPrice);
    setTotalAmount(
      (selectedRoomPrice === undefined ? 0 : selectedRoomPrice) *
        numberOfDays *
        roomsCount +
        extraFeatureAmount
    );
  }, [selectedRoomPrice]);

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
        {/* Card Header Box */}
        <Box sx={{ flexGrow: 1 }}>
          <Grid container className={styles["card_header"]}>
            <Grid item xs={6} md={6}>
              <Typography variant="h6">
                {isDiscountApplied ? roomPrice ?? 0 : roomOriginalPrice ?? 0}
                <span className={styles["night_text"]}>/night</span>
              </Typography>
            </Grid>
            {roomOriginalPrice > 0 && isDiscountApplied && (
              <>
                <Grid item xs={3} md={3}>
                  <Typography className={styles["discounted_price"]}>
                    <s>${roomOriginalPrice}/night</s>
                  </Typography>
                </Grid>
                <Grid item xs={3} md={3}>
                  <Chip
                    label="10% OFF"
                    color="primary"
                    className={styles["discount_chip"]}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </Box>
        <Divider />
        {/* Dates and Number of days */}
        <form onSubmit={submitHandler}>
          <Box className={styles["dates_container"]} sx={{ flexGrow: 1 }}>
            <Grid container className={styles["card_header"]}>
              <Grid item xs={5} md={5}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    clearable={true}
                    label="Check In"
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
            {/* <Grid container className={styles["card_header"]}>
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
            </Grid> */}
            {/* Number of Rooms */}
            <Typography variant="caption">
              {selectedRoomPrice === undefined ||
              selectedRoomPrice === 0 ||
              checkOutDate === null ||
              available_rooms > 5
                ? ""
                : `Hurry ! Only ${available_rooms} rooms available.`}
            </Typography>
            <Grid container className={styles["card_header"]}>
              <Grid item xs={2}>
                <IconButton
                  onClick={decrementRoomsCount}
                  disabled={
                    selectedRoomPrice === undefined ||
                    selectedRoomPrice === 0 ||
                    checkOutDate === null
                      ? true
                      : false
                  }
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
                  disabled={
                    selectedRoomPrice === undefined ||
                    selectedRoomPrice === 0 ||
                    checkOutDate === null
                      ? true
                      : false
                  }
                  required
                  onChange={roomInputOnChangeHandler}
                />
              </Grid>
              <Grid item xs={2}>
                <IconButton
                  onClick={incrementRoomsCount}
                  disabled={
                    selectedRoomPrice === undefined ||
                    selectedRoomPrice === 0 ||
                    checkOutDate === null
                      ? true
                      : false
                  }
                >
                  <AddBoxIcon fontSize="large" color="info"></AddBoxIcon>
                </IconButton>
              </Grid>
            </Grid>
          </Box>
          {/* Extra Features */}
          <Typography className={styles["night_text"]}>
            Extra Features
          </Typography>
          <Box>
            {props.extraFeatures.map((extraFeature) => (
              <Grid
                key={extraFeature.id}
                container
                className={styles["card_header"]}
                sx={{ marginBottom: "0" }}
              >
                <Grid item xs={2} md={2}>
                  <Checkbox
                    disabled={checkOutDate === null}
                    name={extraFeature.cost.toString()}
                    onChange={ExtraFeaturesChangeHandler}
                  ></Checkbox>
                </Grid>
                <Grid item xs={8} md={8}>
                  {extraFeature.name}
                </Grid>
                <Grid className={styles["night_text"]} item xs={2} md={2}>
                  ${extraFeature.cost}
                </Grid>
              </Grid>
            ))}
          </Box>
          {/* Total payment and Submit */}
          <Grid container alignItems="center">
            <Grid item xs={9}>
              <Typography className={styles["night_text"]}>
                Total Payment (for {numberOfDays} days)
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
                disabled={
                  selectedRoomPrice === undefined ||
                  selectedRoomPrice === 0 ||
                  checkOutDate === null
                    ? true
                    : false
                }
              >
                {selectedRoomPrice === undefined || selectedRoomPrice === 0
                  ? "Select Room"
                  : "Book Now"}
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

HotelBookingCard.propTypes = {
  id: PropTypes.number,
  extraFeatures: PropTypes.array,
};

export default HotelBookingCard;
