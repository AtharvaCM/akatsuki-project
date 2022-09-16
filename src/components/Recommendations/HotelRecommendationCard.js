import React from "react";
import PropTypes from "prop-types";

// MUI
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import StarIcon from "@mui/icons-material/Star";

// react router
import { useNavigate } from "react-router-dom";

// path constants
import { ROUTES } from "../../utils/constants/routingPathConstants";

const HotelRecommendationCard = (props) => {
  const navigate = useNavigate();

  const handleBookNowClick = () => {
    // redirect to the hotel
    navigate(`${ROUTES.HOTEL_DETAILS}/${props.hotelId}`);
  };

  return (
    <div>
      <Box sx={styles.mainCard}>
        <Grid container display={"flex"}>
          {/* Hotel Image */}
          <Grid item xs={12} md={6} lg={5}>
            <Box
              component="img"
              alt="Img"
              height={"130px"}
              width={"150px"}
              src={props.hotelDp}
            />
          </Grid>
          {/* Hotel Details */}
          <Grid item xs={12} md={6} lg={7}>
            <Typography style={styles.hotelName}>{props.hotelName}</Typography>
            <Box
              display="flex"
              alignItems={"center"}
              style={{ marginBottom: "8px" }}
            >
              <StarIcon fontSize="small" style={styles.starIcon} />
              <Typography style={styles.rating}>{props.avgRating}</Typography>
            </Box>

            <Box
              display="flex"
              alignItems={"center"}
              style={{ marginBottom: "8px" }}
            >
              <Typography style={styles.pricetag}>${props.price}</Typography>
              <Typography style={styles.night}>/night</Typography>
            </Box>
            <Button variant="contained" onClick={handleBookNowClick}>
              Book Now
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

HotelRecommendationCard.propTypes = {
  hotelId: PropTypes.number.isRequired,
  hotelName: PropTypes.string.isRequired,
  avgRating: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  hotelDp: PropTypes.string.isRequired,
};

const styles = {
  mainCard: {
    backgroundColor: "#ffffff",
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
  starIcon: {
    color: "#FF9C09",
    marginRight: "3px",
  },
  rating: {
    fontSize: "13px",
    fontWeight: "600",
  },
  night: {
    fontSize: "13px",
    color: "#878686",
  },
  pricetag: {
    fontWeight: "600",
  },
};

export default HotelRecommendationCard;
