import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import LocationRecommendationCard from "./LocationRecommendationCard";

const LocationRecommendation = () => {
  return (
    <Box style={styles.container}>
      {/* Title */}
      <Typography style={{ textAlign: "center" }} variant="h4" gutterBottom>
        Recommended Locations For You
      </Typography>

      {/* Card Container */}
      <Box style={styles.cardContainer}>
        <LocationRecommendationCard />
      </Box>
    </Box>
  );
};

const styles = {
  container: {
    backgroundColor: "#ffffff",
    width: "100%",
    padding: "30px",
    marginTop: "150px",
  },
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
};

export default LocationRecommendation;
