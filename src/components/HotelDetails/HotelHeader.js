import React from "react";
import PropTypes from "prop-types";

import { Typography, Grid } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Rating from "@mui/material/Rating";

// Custom Component
import Tags from "./Tags";

// CSS Imports
import styles from "./HotelHeader.module.css";

const HotelHeader = (props) => {
  return (
    <>
      <Typography variant="h4" className={styles["hotel_name"]}>
        {props.name}
      </Typography>
      <div className={`${styles.caption}`}>
        <Typography variant="caption" className={`${styles.caption}`}>
          <Grid container direction="row" alignItems="center">
            <StarIcon className={`${styles.star} ${styles.iconfontsize}`} />
            {props.ratings}
            <span className={`${styles.grey}`}>
              &nbsp;({props.number_of_reviews} reviews)
            </span>
            <LocationOnOutlinedIcon
              className={`${styles.iconfontsize} ${styles.grey} ${styles.hotel_address}`}
            />
            {props.address}
          </Grid>
        </Typography>
      </div>
      <div className={styles.imagecontainer}>
        <Grid container>
          <Grid item xs={12} md={7}>
            <img
              className={styles.leftimg}
              src={props.room_images[0]}
              alt="Hotel_Image"
            ></img>
          </Grid>
          <Grid item xs={12} md={5}>
            <Grid container spacing={2.2}>
              {[1, 2, 3].map((number) => (
                <Grid key={number} item xs={12} md={12}>
                  <img
                    className={styles.rightimg}
                    src={props.room_images[number]}
                    alt="Hotel_Image"
                  ></img>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </div>
      <div>
        <Tags />
        <Rating name="read-only" value={props.ratings} readOnly />
      </div>
      <Typography variant="h5" className={styles["room_title"]}>
        Exclusive room in house
      </Typography>
      <Typography variant="h6" className={styles["city_state"]}>
        {props.city}, {props.state}
      </Typography>
    </>
  );
};

HotelHeader.propTypes = {
  name: PropTypes.string,
  ratings: PropTypes.number,
  number_of_reviews: PropTypes.number,
  address: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  room_images: PropTypes.array,
};

export default HotelHeader;
