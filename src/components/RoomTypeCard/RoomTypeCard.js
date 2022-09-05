import React from "react";
import {
  Card,
  Grid,
  Table,
  Typography,
  Column,
  Box,
  Button,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

import style from "./RoomTypeCard.module.css";

const services = [
  "Free Wifi",
  "Breakfast for two people",
  "No-refundable",
  "No-refundable",
];

const RoomTypeCard = () => {
  return (
    <div>
      <Card className={style.roomCard} variant="outlined" style={{borderRadius:"10px"}}>
        <div className={style.innerCard}>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <Typography variant="h6" style={{ fontWeight: "bolder"}}>Double Room</Typography>
              <Typography style={{ fontSize: 12, color: "#89898C",margin:"7px 0px" }}>
                Offer Conditions
              </Typography>
              <Box sx={{ flexGrow: 1 }} >
                <Grid
                  container
                  spacing={{ xs: 1 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                  sx={{ flexDirection: "row" }}
                >
                  {services.map((service, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index}>
                      <span style={{display: "flex", alignItems: "flex-end"}}>
                        <CheckIcon
                          color="success"
                          fontSize="small"
                          style={{ marginRight: 4 }}
                        />
                        <Typography style={{ fontSize: 12 }}>
                          {service}
                        </Typography>
                      </span>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={3} textAlign={"right"}>
              <div>
                <Typography variant="h6">
                  $230
                  <span style={{ color: "#A4A2A2", fontSize: "16px" }}>
                    /night
                  </span>
                </Typography>
              </div>
              <Typography style={{ color: "#FF9C09", fontSize: "16px",fontWeight:600,lineHeight:"21.78px" }}>
                Save $4
              </Typography>
              <Typography style={{ color: "#A4A2A2", fontSize: "12px"}}>
                Amount before discount $234/night
              </Typography>
              <Button variant="contained" style={{ marginTop: 7,borderRadius:"9px",fontSize:"15px",textTransform:"none" }}>
                Select
              </Button>
            </Grid>
          </Grid>
        </div>
      </Card>
    </div>
  );
};

export default RoomTypeCard;
