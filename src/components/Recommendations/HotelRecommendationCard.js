import React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const HotelRecommendationCard = () => {
  const hotelName = "Santorini, Greece";
  const avgRating = "4.19";
  const price = "134";
  return (
    <div>
      <Box sx={styles.mainCard}>
        <Grid container display={"flex"}>
          <Grid xs={12} md={6} lg={5} >
            <Box
              component="img"
              alt="Img"
              height={"130px"}
              width={"150px"}
              src="https://res.cloudinary.com/difrv1tb6/image/upload/v1662113208/HotelBookingAppAssets/BookingConfirmation_vjenmg.png"
            />
          </Grid>
          <Grid xs={12} md={6} lg={7}>
            <Typography style={styles.hotelName}>{hotelName}</Typography>
            <Box
              container
              display="flex"
              alignItems={"center"}
              style={{ marginBottom: "8px" }}
            >
              <StarIcon
                fontSize="small"
                style={styles.starIcon}
              />
              <Typography style={styles.rating}>{avgRating}</Typography>
            </Box>
            <Box
              container
              display="flex"
              alignItems={"center"}
              style={{ marginBottom: "8px" }}
            >
              <Typography style={styles.pricetag}>${price}</Typography>
              <Typography style={styles.night}>/night</Typography>
            </Box>
            <Button variant="contained">Book Now</Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

const styles = {
  mainCard: {
    backgroundColor:"#ffffff",
    borderRadius: "17px",
    margin: "20px",
    padding: "15px",
    width: "440px",
  },
  hotelName: {
    fontSize: "20px",
    fontWeight: "600",
    lineHeight: "24px",
    marginBottom: "9px",
  },
  starIcon:{
    color: "#FF9C09",
    marginRight: "3px"
  },
  rating:{
    fontSize: "13px",
    fontWeight:"600"
  },
  night:{
    fontSize: "13px",
    color:"#878686"
  },
  pricetag:{
    fontWeight:"600"
  }
};

export default HotelRecommendationCard;
