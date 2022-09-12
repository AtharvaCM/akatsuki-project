import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Card, Grid, Typography, Box, Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

import style from "./RoomTypeCard.module.css";

import { useDispatch, useSelector } from "react-redux";

// actions
import { updateRoomPrice } from "../../store/roomTypeSlice";

const services = [
  "Free Wifi",
  "Breakfast for two people",
  "No-refundable",
  "No-refundable",
];

// const room_type = "Double Room";
const offerPercentage = 10;

const RoomTypeCard = (props) => {
  const price = props.price;
  const roomType = props.room_type;

  const dispatch = useDispatch();
  const { roomType: selectedRoomType } = useSelector(
    (state) => state.roomPrice
  );

  const onClickSelect = (original_price, roomPrice) => {
    console.log(original_price);
    //store in redux
    dispatch(
      updateRoomPrice({
        roomType: roomType,
        roomOriginalPrice: original_price,
        roomPrice: roomPrice,
      })
    );
  };

  useEffect(() => {}, [selectedRoomType]);

  return (
    <div>
      <Card
        className={style.roomCard}
        variant="outlined"
        style={{
          borderRadius: "10px",
          marginBottom: "2%",
          backgroundColor: `${
            selectedRoomType === roomType ? "#e6ffe6" : "white"
          }`,
        }}
      >
        <div className={style.innerCard}>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <Typography variant="h6" style={{ fontWeight: "bolder" }}>
                {roomType}
              </Typography>
              <Typography
                style={{ fontSize: 12, color: "#89898C", margin: "7px 0px" }}
              >
                Offer Conditions
              </Typography>
              <Box sx={{ flexGrow: 1 }}>
                <Grid
                  container
                  spacing={{ xs: 1 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                  sx={{ flexDirection: "row" }}
                >
                  {services.map((service, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index}>
                      <span style={{ display: "flex", alignItems: "flex-end" }}>
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
                  ${price - Math.round((price * offerPercentage) / 100)}
                  <span style={{ color: "#A4A2A2", fontSize: "16px" }}>
                    /night
                  </span>
                </Typography>
              </div>
              <Typography
                style={{
                  color: "#FF9C09",
                  fontSize: "16px",
                  fontWeight: 600,
                  lineHeight: "21.78px",
                }}
              >
                Save ${Math.round((price * offerPercentage) / 100)}
              </Typography>
              <Typography style={{ color: "#A4A2A2", fontSize: "12px" }}>
                <s>${price}/night</s>
              </Typography>
              <Button
                type="button"
                color={`${
                  selectedRoomType === roomType ? "success" : "primary"
                }`}
                onClick={() =>
                  onClickSelect(
                    price,
                    price - Math.round((price * offerPercentage) / 100)
                  )
                }
                variant="contained"
                style={{
                  marginTop: 7,
                  borderRadius: "9px",
                  fontSize: "15px",
                  textTransform: "none",
                }}
              >
                {selectedRoomType === roomType ? "Selected" : "Select"}
              </Button>
            </Grid>
          </Grid>
        </div>
      </Card>
    </div>
  );
};

RoomTypeCard.propTypes = {
  price: PropTypes.number,
  room_type: PropTypes.string,
};

export default RoomTypeCard;
