import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import HotelRecommendationCard from "./HotelRecommendationCard";

const HotelRecommendation = () => {
  return (
    <Box
      style={{
        height: "455px",
        backgroundColor: "#EAEAEB",
        width: "100%",
        padding: "5px",
        marginTop: "100px",
        
      }}
    >
      <Typography style={{textAlign:"center"}} variant="h4">Trending Cities</Typography>
      <Box
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <HotelRecommendationCard />
        <HotelRecommendationCard />
        
      </Box>
    </Box>
  );
};

export default HotelRecommendation;
