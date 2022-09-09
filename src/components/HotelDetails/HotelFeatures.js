import React from "react";
import { Typography, Divider, Grid, Box } from "@mui/material";

import { FEATURES_ICONS } from "../../utils/constants/iconsConstants";

import PropTypes from "prop-types";

const HotelFeatures = (props) => {
  return (
    <>
      <h4>Hotel Features</h4>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 1 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          direction="row"
          alignItems="center"
        >
          {props.features.map((feature, index) => (
            <React.Fragment key={index}>
              <Grid
                item
                sx={{
                  margin: "0 0.6%",
                  alignItems: "center",
                  verticalAlign: "middle",
                  display: "inline-flex",
                }}
              >
                {FEATURES_ICONS[feature]}
                <Typography variant="caption" sx={{ marginLeft: "0.5em" }}>
                  {feature}
                </Typography>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </Box>
      <Divider sx={{ marginTop: "3%" }} />
      <h4>Amenities</h4>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={1}
          columns={{ xs: 4, sm: 8, md: 12 }}
          direction="row"
          alignItems="center"
        >
          {props.amenities.map((amenity, index) => (
            <React.Fragment key={index}>
              <Grid
                item
                xs={4}
                sm={4}
                sx={{
                  alignItems: "center",
                  verticalAlign: "middle",
                  display: "inline-flex",
                }}
              >
                {FEATURES_ICONS[amenity]}
                <Typography variant="caption" sx={{ margin: "0 10%" }}>
                  {amenity}
                </Typography>
              </Grid>
            </React.Fragment>
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
