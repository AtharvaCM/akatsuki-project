import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

//MUI
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import LoadingButton from "@mui/lab/LoadingButton";
// import Button from "@mui/material/Button";

// import AddBoxIcon from "@mui/icons-material/AddBox";
// import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";

// Date Imports
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

// redux
import { useDispatch, useSelector } from "react-redux";

// path constants
import { ROUTES } from "../../utils/constants/routingPathConstants";

// react router
import { useNavigate } from "react-router-dom";

// CSS
import styles from "./HotelBookingCard.module.css";

// actions
import {
  setBookingCode,
  setBookingDetails,
} from "../../store/bookingDetailsSlice";

// Custom hooks
import { useAxios } from "../../hooks/useAxios";

const roomsCount = 1;
const bookingURL = `${process.env.REACT_APP_FLASK_DOMAIN}/api/v1/bookings/`;

const HotelBookingCard = (props) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    loaded: bookingLoaded,
    error: bookingError,
    data: bookingData,
    callAPI: callBookingAPI,
  } = useAxios();

  // get hotel id from url
  const hotel_id = location.pathname.split("/").at(-1);

  // selctors
  const {
    checkInDate: searchedCheckInDate,
    checkOutDate: searchedCheckOutDate,
  } = useSelector((state) => state.searchHotel);

  const {
    roomPrice: selectedRoomPrice,
    roomOriginalPrice,
    roomType: selectedRoomType,
    room_id: selectedRoomId,
  } = useSelector((state) => state.roomPrice);

  // React Hooks
  const [checkInDate, setCheckInDate] = useState(
    searchedCheckInDate ? JSON.parse(searchedCheckInDate) : null
  );
  const [checkOutDate, setCheckOutDate] = useState(
    searchedCheckOutDate ? JSON.parse(searchedCheckOutDate) : null
  );
  // const [guestsCount, setGuestsCount] = useState(1);
  const [roomPrice, setRoomPrice] = useState(0);
  // const [roomsCount, setRoomsCount] = useState(1);
  const [extraFeatureAmount, setExtraFeatureAmount] = useState(0);
  const [numberOfDays, setNumberOfDays] = useState(
    checkOutDate !== null
      ? dayjs(checkOutDate).diff(dayjs(checkInDate), "day")
      : 0
  );
  const [totalAmount, setTotalAmount] = useState(roomPrice * numberOfDays);
  const [loading, setLoading] = useState(false);

  // const decrementGuestCount = () => {
  //   if (guestsCount > 1) {
  //     setGuestsCount((prevState) => +prevState - 1);
  //   }
  // };

  // const incrementGuestCount = () => {
  //   setGuestsCount((prevState) => +prevState + 1);
  // };

  // Do NOT TOUCH THIS COMMENTED CODE . IT WILL BE ADDED IN NEXT SPRINT
  // const decrementRoomsCount = () => {
  //   if (roomsCount > 1) {
  //     setRoomsCount((prevState) => +prevState - 1);
  //     setTotalAmount((prevState) => prevState - roomPrice * numberOfDays);
  //   }
  // };

  // const incrementRoomsCount = () => {
  //   setRoomsCount((prevState) => +prevState + 1);
  //   setTotalAmount((prevState) => prevState + roomPrice * numberOfDays);
  // };

  // const roomInputOnChangeHandler = (e) => {
  //   let newRoomsCount =
  //     e.target.value.length === 0 || e.target.value < 1 ? "" : e.target.value;

  //   setRoomsCount(newRoomsCount);
  //   setTotalAmount(
  //     extraFeatureAmount + newRoomsCount * +roomPrice * numberOfDays
  //   );
  // };

  // const guestsInputOnChangeHandler = (e) => {
  //   setGuestsCount(
  //     e.target.value.length === 0 || e.target.value < 1 ? "" : e.target.value
  //   );
  // };

  const ExtraFeaturesChangeHandler = (e) => {
    if (e.target.checked) {
      setExtraFeatureAmount((prevState) => prevState + +e.target.name);
      setTotalAmount((prevState) => prevState + +e.target.name);
    } else {
      setExtraFeatureAmount((prevState) => prevState - +e.target.name);
      setTotalAmount((prevState) => prevState - +e.target.name);
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

  const submitHandler = (e) => {
    e.preventDefault();
    // show loader in button
    setLoading(true);

    // set booking details in redux
    const payload = {
      user_id: 2,
      room_type: selectedRoomType,
      check_in_date: JSON.parse(searchedCheckInDate).substring(0, 10),
      check_out_date: JSON.parse(searchedCheckOutDate).substring(0, 10),
      amount: totalAmount,
      number_of_rooms: 1,
      hotel_id: hotel_id,
      room_id: selectedRoomId,
    };
    dispatch(setBookingDetails({ ...payload, hotel_name: props.hotel_name }));

    // POST booking request
    callBookingAPI(bookingURL, "POST", payload);
  };

  // when booking api response is received
  useEffect(() => {
    if (bookingLoaded) {
      // stop showing loader in button
      setLoading(false);

      // if booking was successful, Redirect to booking confirmation page
      if (
        bookingData.status == "Booking successful" &&
        checkInDate !== null &&
        checkOutDate !== null
      ) {
        dispatch(setBookingCode({ booking_code: bookingData.booking_code }));
        navigate(`${ROUTES.BOOKING_CONFIRMATION}`);
      } else {
        // display error
        console.log("something went wrong");
      }
    }
  }, [bookingLoaded]);

  // to recalculate prices after updates
  useEffect(() => {
    setRoomPrice(selectedRoomPrice === undefined ? 0 : selectedRoomPrice);
    setTotalAmount(
      (selectedRoomPrice === undefined ? 0 : selectedRoomPrice) * numberOfDays +
        extraFeatureAmount
    );
  });

  if (bookingError) {
    console.log("bookingError: ", bookingError);
  }

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
                ${roomPrice ?? 0}
                <span className={styles["night_text"]}>/night</span>
              </Typography>
            </Grid>
            {roomOriginalPrice > 0 && (
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

        <form onSubmit={submitHandler}>
          <Box className={styles["dates_container"]} sx={{ flexGrow: 1 }}>
            <Grid container className={styles["card_header"]}>
              {/* Check in date */}
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
              {/* Check out date */}
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
            {/* No of guests */}
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
            {/* No of guests END */}

            {/* // Do NOT TOUCH THIS COMMENTED CODE . IT WILL BE ADDED IN NEXT SPRINT */}
            {/* <Grid container className={styles["card_header"]}>
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
            </Grid> */}
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
          {/* Extra Features END */}

          <Grid container alignItems="center">
            <Grid item xs={9}>
              <Typography className={styles["night_text"]}>
                Total Payment (for {numberOfDays} days)
              </Typography>
            </Grid>
            {/* Total Amount */}
            <Grid item xs={3}>
              <Typography variant="h6">${totalAmount}</Typography>
            </Grid>
            {/* Book now button */}
            <Grid item xs={12}>
              {/* <Button
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
              </Button> */}
              <LoadingButton
                size="medium"
                disabled={
                  selectedRoomPrice === undefined ||
                  selectedRoomPrice === 0 ||
                  checkOutDate === null
                    ? true
                    : false
                }
                type="submit"
                loading={loading}
                loadingPosition="center"
                variant="contained"
                color="primary"
                sx={{ width: "100%", margin: "5% auto" }}
                className={styles["booknow_btn"]}
              >
                {selectedRoomPrice === undefined || selectedRoomPrice === 0
                  ? "Select Room"
                  : "Book Now"}
              </LoadingButton>
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
  extraFeatures: PropTypes.array,
  hotel_name: PropTypes.string,
};

export default HotelBookingCard;
