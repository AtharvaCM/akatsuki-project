import React from "react";

import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import styles from "./LocationRecommendationCard.module.css"

const LocationRecommendationCard = () => {
  const location = "Budapest, Hungary";
  return (
    <box className={styles.mainCard}>
      <Box
        component="img"
        alt="Img"
        height={"50px"}
        width={"50px"}
        src="https://res.cloudinary.com/difrv1tb6/image/upload/v1662113208/HotelBookingAppAssets/BookingConfirmation_vjenmg.png"
      />
      <Typography style={{fontSize:"16px",fontWeight:"600",margin:"8px 0px"}}>{location}</Typography>
      <Typography style={{fontSize:"10px",color:"#73757A"}}>200 Properties</Typography>
    </box>
  );
};

export default LocationRecommendationCard;
