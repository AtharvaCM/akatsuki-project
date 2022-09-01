import React from "react";
import PropTypes from "prop-types";

// router
import { useNavigate } from "react-router-dom";

// MUI
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";

import Typography from "@mui/material/Typography";

import Grid from "@mui/material/Grid";

// MUI icons
import StarIcon from "@mui/icons-material/Star";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import FlightOutlinedIcon from "@mui/icons-material/FlightOutlined";
import WifiOutlinedIcon from "@mui/icons-material/WifiOutlined";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";

// assets
import { ReactComponent as DatabaseIcon } from "../../assets/images/database_icon.svg";

// styles
import "./HotelListCard.css";

// Routes
import { ROUTES } from "../../utils/constants/routingPathConstants";

const HotelListCard = (props) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    // Redirect to hotel detail page
    navigate(`${ROUTES.HOTEL_DETAILS}/${props.id}`);
  };

  console.log("img_src: ", props.img_src);
  return (
    <Card sx={{ borderRadius: "24px" }}>
      <Grid container>
        {/* Hotel Image */}
        <Grid item md={5}>
          <CardMedia
            component="img"
            height="467"
            width="410"
            image={props.img_src}
            alt={props.hotel_name}
          />
        </Grid>

        {/* Hotel Details */}
        <Grid item md={7} className="hotelDetailsGridItem">
          <CardContent>
            <Typography
              variant="h4"
              component="h4"
              gutterBottom
              fontWeight={"bolder"}
              className="hotelLocation"
            >
              {props.state}, {props.country}
            </Typography>
            <Typography
              variant="h5"
              component="h5"
              gutterBottom
              fontWeight={"bolder"}
            >
              {props.hotel_name}
            </Typography>
            {/* Ratings */}
            <span className="ratingsSpan">
              <StarIcon className="ratingsIcon" />
              <Typography variant="body1" className="iconLabels">
                {props.rating} ({props.reviews_count} reviews)
              </Typography>
            </span>
            <Grid container>
              {/* Address */}
              <Grid item md={7} className="alignCenter">
                <LocationOnOutlinedIcon className="icon" />
                <address className="iconLabels hotelAddress">
                  {props.address}
                </address>
              </Grid>
              {/* Dates */}
              <Grid item md={5} className="alignCenter">
                <DateRangeOutlinedIcon className="icon" />
                <Typography variant="body1" className="iconLabels">
                  {props.check_in_date} - {props.check_out_date}
                </Typography>
              </Grid>
            </Grid>
            {/* Departure */}
            <span className="departure">
              <FlightOutlinedIcon className="icon" />
              <Typography variant="body1" className="iconLabels">
                Departure from {props.departure}
              </Typography>
            </span>

            <Grid container>
              {/* Hotel features */}
              <Grid item md={6}>
                <div className="hotelFeatures">
                  <span>
                    <WifiOutlinedIcon className="icon" />
                    <Typography variant="body1" className="iconLabels">
                      Free Wifi
                    </Typography>
                  </span>
                  <span>
                    <DirectionsCarOutlinedIcon className="icon" />
                    <Typography variant="body1" className="iconLabels">
                      Free Parking
                    </Typography>
                  </span>
                  <span>
                    <LocalOfferOutlinedIcon className="icon" />
                    <Typography variant="body1" className="iconLabels">
                      Special Offer
                    </Typography>
                  </span>
                  <span>
                    <LanguageOutlinedIcon className="icon" />
                    <Typography variant="body1" className="iconLabels">
                      Visit Hotel Website
                    </Typography>
                  </span>
                  <span>
                    <DatabaseIcon className="dbIcon" />
                    <Typography variant="body1" className="iconLabels">
                      Taking Safety Measures
                    </Typography>
                  </span>
                </div>
              </Grid>
              {/* Book Now Buttons */}
              <Grid item md={6}>
                <div className="bookNowButtons">
                  {/* Price chip */}
                  <Chip
                    label={
                      <span className="priceChipSpan">
                        <Typography variant="h6">${props.price}</Typography>
                        <Typography variant="caption">
                          For {props.capacity}
                        </Typography>
                      </span>
                    }
                  />
                  {/* Book now chip */}
                  <Chip
                    color="primary"
                    sx={{ mt: "15px" }}
                    label={
                      <Typography variant="h6" className="bookNowLabel">
                        Book Now
                      </Typography>
                    }
                    onClick={handleBookNow}
                  />
                </div>
              </Grid>
            </Grid>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

// prop types
HotelListCard.propTypes = {
  id: PropTypes.number,
  hotel_name: PropTypes.string,
  img_src: PropTypes.string,
  state: PropTypes.string,
  country: PropTypes.string,
  address: PropTypes.string,
  check_in_date: PropTypes.string,
  check_out_date: PropTypes.string,
  rating: PropTypes.number,
  reviews_count: PropTypes.number,
  departure: PropTypes.string,
  price: PropTypes.number,
  capacity: PropTypes.string,
};

export default HotelListCard;
