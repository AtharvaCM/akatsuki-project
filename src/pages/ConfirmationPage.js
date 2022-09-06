import React from "react";

//Custom UI
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";


const ConfirmationPage = () => {
  return (
    <div style={{ margin: "20px" }}>
      <Typography
        sx={{ fontSize: "20px", fontWeight: 600, lineHeight: "29px" }}
      >
        Congratulations!
      </Typography>
      <Typography sx={{ fontWeight: 600, lineHeight: "58px" }} variant={"h4"}>
        Your trip has been booked!
      </Typography>
      <Typography
        sx={{ fontSize: "13px", fontWeight: 600, lineHeight: "15px" }}
      >
        (1 Exclusive room)
      </Typography>

      <div style={{ margin: "25px 0px" }}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={5}>
            <Grid container display="flex" style={{ marginBottom: "25px" }}>
              <Box sx={styles.smallBox}>
                <Typography sx={styles.smallBoxHeading}>Dates</Typography>
                <Typography sx={styles.smallBoxData}>
                  September 15 - 22 2022
                </Typography>
              </Box>
              <Box sx={styles.smallBox}>
                <Typography sx={styles.smallBoxHeading}>Travelers</Typography>
                <Typography sx={styles.smallBoxData}>3 Passengers</Typography>
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
                  <Typography sx={styles.bookingHeaders}>Date</Typography>
                  <Typography sx={styles.bookingHeaders}>Total</Typography>
                  <Typography sx={styles.bookingHeaders}>
                    Payment Method
                  </Typography>
                </Grid>
                <Grid item xs={4} md={4}>
                  <Typography sx={styles.bookingDetails}>FD_158456</Typography>
                  <Typography sx={styles.bookingDetails}>15.08.2022</Typography>
                  <Typography sx={styles.bookingDetails}>$1000</Typography>
                  <Typography sx={styles.bookingDetails}>
                    Credit card
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item sx={12} md={7} display="flex">
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
      <Button variant="contained" sx={styles.backButton}>
        Back to Home page
      </Button>
    </div>
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
