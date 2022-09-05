import React from "react";
import { Typography, Grid, Box } from "@mui/material";
import { Divider } from "@mui/material";
import PropTypes from "prop-types";

const ListStyle = {
  listStyleType: "none",
  padding: "0",
};

const ListEltStyle = {
  display: "inline",
  marginLeft: "2%",
};

const HotelFeatures = (props) => {
  return (
    <>
      <h4>Hotel Features</h4>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {props.features.map((feature, index) => (
            <Grid item xs="auto" sm="auto" md="auto" key={index}>
              <Typography>{feature}</Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Divider />
      <h4>Amenities</h4>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {props.amenities.map((amenity, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Typography>{amenity}</Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

HotelFeatures.propTypes = {
  features: PropTypes.array,
  amenities: PropTypes.array,
};

export default HotelFeatures;
