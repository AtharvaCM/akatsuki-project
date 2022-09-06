import { Grid, Typography, Card, Box, Button } from "@mui/material";
import { color } from "@mui/system";
import React from "react";

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
              <Box
                style={{
                  background: "#F4F4F6",
                  borderRadius: "8px",
                  padding: "10px",
                  width: "42%",
                  marginRight: "6%",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: 600,
                    lineHeight: "15px",
                  }}
                >
                  Dates
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: "#858383",
                  }}
                >
                  September 15 - 22 2022
                </Typography>
              </Box>
              <Box
                style={{
                  background: "#F4F4F6",
                  borderRadius: "8px",
                  padding: "10px",
                  width: "42%",
                }}
              >
                <Typography
                  sx={{ fontSize: "13px", fontWeight: 600, lineHeight: "15px" }}
                >
                  Travelers
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: "#858383",
                  }}
                >
                  3 Passengers
                </Typography>
              </Box>
            </Grid>
            <Box
              style={{
                background: "#F4F4F6",
                borderRadius: "8px",
                padding: "20px",
                width: "90%",
              }}
            >
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
                  <Typography
                    sx={{
                      fontSize: "16px",
                      lineHeight: "22px",
                      fontWeight: "400",
                      color: "#999898",
                      marginBottom: "10px",
                    }}
                  >
                    Booking Code
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      lineHeight: "22px",
                      fontWeight: "400",
                      color: "#999898",
                      marginBottom: "10px",
                    }}
                  >
                    Date
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      lineHeight: "22px",
                      fontWeight: "400",
                      color: "#999898",
                      marginBottom: "10px",
                    }}
                  >
                    Total
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      lineHeight: "22px",
                      fontWeight: "400",
                      color: "#999898",
                    }}
                  >
                    Payment Method
                  </Typography>
                </Grid>
                <Grid item xs={4} md={4}>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      lineHeight: "22px",
                      fontWeight: "400",
                      marginBottom: "10px",
                    }}
                  >
                    FD_158456
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      lineHeight: "22px",
                      fontWeight: "400",
                      marginBottom: "10px",
                    }}
                  >
                    15.08.2022
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      lineHeight: "22px",
                      fontWeight: "400",
                      marginBottom: "10px",
                    }}
                  >
                    $1000
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      lineHeight: "22px",
                      fontWeight: "400",
                    }}
                  >
                    Credit card
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item sx={12} md={7} display="flex">
            {/* <Box
              component="img"
              alt="Img"
              height="73%"
              width={"100%"}
              src="https://res.cloudinary.com/difrv1tb6/image/upload/v1662113208/HotelBookingAppAssets/BookingConfirmation_vjenmg.png"
              style={{ marginRight: 10 }}
            /> */}
          </Grid>
        </Grid>
      </div>
      <Button
        variant="contained"
        sx={{ borderRadius: "40px", marginTop: "20px", textTransform: "none" }}
      >
        Back to Home page
      </Button>
    </div>
  );
};

const styles = {};

export default ConfirmationPage;
