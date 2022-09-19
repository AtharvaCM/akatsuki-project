import React, { useEffect, useState } from "react";

import dayjs from "dayjs";

//Custom UI
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

// custom components
import BreadCrumbs from "../components/BreadCrumbs/BreadCrumbs";

// path constants
import { ROUTES } from "../utils/constants/routingPathConstants";

// react router
import { useNavigate } from "react-router-dom";

// redux
import { useSelector } from "react-redux";

// Custom Alert Component
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ConfirmationPage = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(true);

  const onClickHome = () => {
    navigate(`${ROUTES.HOME}`);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  // selector
  // {
  //   user_id,
  //   room_type,
  //   check_in_date,
  //   check_out_date,
  //   amount,
  //   number_of_rooms,
  //   hotel_id,
  //   room_id,
  // }
  const bookingState = useSelector((state) => state.bookingDetails);
  // console.log("bookingState: ", bookingState);

  const BreadCrumbsData = [
    { label: "Hotel List", route: ROUTES.HOTEL_LIST },
    {
      label: "Hotel Details",
      route: `${ROUTES.HOTEL_DETAILS}/${bookingState.hotel_id}`,
    },
  ];

  let today = new Date().toLocaleDateString("eu");

  // static data
  const roomCount = 1;

  const bookingDate = `${JSON.stringify(
    dayjs(bookingState.check_in_date).add(1, "day")
  ).slice(1, 11)} - ${JSON.stringify(
    dayjs(bookingState.check_out_date).add(1, "day")
  ).slice(1, 11)}`;

  const NoOfPassenagers = 2;

  const Details = [
    bookingState.booking_code,
    today,
    bookingState.amount,
    "Credit card",
  ];

  // if no bookinng data present, redirect to home page
  useEffect(() => {
    if (bookingState.booking_code === null) {
      navigate(ROUTES.HOME);
    }
  }, [bookingState.booking_code]);

  return (
    <>
      {/* Alert */}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert
          onClose={handleAlertClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Booking successful !
        </Alert>
      </Snackbar>
      {/* Alert end*/}

      <div style={{ margin: "20px" }}>
        <BreadCrumbs data={BreadCrumbsData} activePage="Congratulations" />
        <Typography
          sx={{ fontSize: "20px", fontWeight: 600, lineHeight: "29px" }}
          gutterBottom
        >
          Congratulations!
        </Typography>
        <Typography
          sx={{ fontSize: "48px", fontWeight: 600, lineHeight: "58px" }}
          variant={"h4"}
          gutterBottom
        >
          Your trip has been booked!
        </Typography>
        {/* Hotel Name */}
        <Typography
          sx={{ fontSize: "32px", fontWeight: 700, lineHeight: "38px" }}
          variant={"h4"}
          gutterBottom
        >
          {bookingState.hotel_name}
        </Typography>
        {/* Room count */}
        <Typography
          sx={{ fontSize: "13px", fontWeight: 600, lineHeight: "15px" }}
          gutterBottom
        >
          ({roomCount} {bookingState.room_type})
        </Typography>

        <div style={{ margin: "25px 0px" }}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={5}>
              <Grid container display="flex" style={{ marginBottom: "25px" }}>
                <Box sx={styles.smallBox}>
                  <Typography sx={styles.smallBoxHeading}>Dates</Typography>
                  <Typography sx={styles.smallBoxData}>
                    {bookingDate}
                  </Typography>
                </Box>
                <Box sx={styles.smallBox}>
                  <Typography sx={styles.smallBoxHeading}>Travelers</Typography>
                  <Typography sx={styles.smallBoxData}>
                    {NoOfPassenagers} Passengers
                  </Typography>
                </Box>
              </Grid>
              <Box sx={styles.ReservationDeatilsBox}>
                <Typography
                  sx={{
                    fontSize: "26px",
                    lineHeight: "33px",
                    fontWeight: "700",
                    marginBottom: "20px",
                  }}
                >
                  Reserve details
                </Typography>
                <Grid container>
                  <Grid item xs={7} md={7}>
                    <Typography sx={styles.bookingHeaders}>
                      Booking Code
                    </Typography>
                    <Typography sx={styles.bookingHeaders}>
                      Booking Date
                    </Typography>
                    <Typography sx={styles.bookingHeaders}>Total</Typography>
                    <Typography sx={styles.bookingHeaders}>
                      Payment Method
                    </Typography>
                  </Grid>
                  <Grid item xs={4} md={4}>
                    <Typography sx={styles.bookingDetails}>
                      {Details[0]}
                    </Typography>
                    <Typography sx={styles.bookingDetails}>
                      {Details[1]}
                    </Typography>
                    <Typography sx={styles.bookingDetails}>
                      ${Details[2]}
                    </Typography>
                    <Typography sx={styles.bookingDetails}>
                      {Details[3]}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12} md={7} display="flex">
              <Box
                component="img"
                alt="Img"
                height="290px"
                width={"100%"}
                src="https://res.cloudinary.com/difrv1tb6/image/upload/v1662113208/HotelBookingAppAssets/BookingConfirmation_vjenmg.png"
                style={{ marginRight: 10 }}
              />
            </Grid>
          </Grid>
        </div>
        <Button
          variant="contained"
          sx={styles.backButton}
          onClick={onClickHome}
        >
          Back to Home page
        </Button>
      </div>
    </>
  );
};

const styles = {
  bookingDetails: {
    fontSize: "16px",
    lineHeight: "22px",
    fontWeight: "400",
    marginBottom: "10px",
  },
  bookingHeaders: {
    fontSize: "16px",
    lineHeight: "22px",
    fontWeight: "400",
    color: "#999898",
    marginBottom: "10px",
  },
  backButton: {
    borderRadius: "40px",
    marginTop: "20px",
    textTransform: "none",
    height: "55px",
    width: "240px",
    fontSize: "18px",
  },
  ReservationDeatilsBox: {
    background: "#F4F4F6",
    borderRadius: "8px",
    padding: "20px",
    width: "90%",
  },
  smallBox: {
    background: "#F4F4F6",
    borderRadius: "8px",
    padding: "10px",
    width: "42%",
    marginRight: "6%",
  },
  smallBoxHeading: {
    fontSize: "13px",
    fontWeight: 600,
    lineHeight: "15px",
  },
  smallBoxData: {
    fontSize: "14px",
    lineHeight: "20px",
    color: "#858383",
  },
};

export default ConfirmationPage;
