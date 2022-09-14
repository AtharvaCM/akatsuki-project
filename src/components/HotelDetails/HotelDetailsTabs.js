import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// MUI
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

// Custom Components
import HotelFeatures from "./HotelFeatures";

import RoomTypeCard from "./RoomTypeCard";
import Loader from "../UI/Loader";
import ReviewTab from "./Tabs/ReviewTab";

// custom hooks
import { useAxios } from "../../hooks/useAxios";

const PaddingZeroStyle = {
  whiteSpace: "pre-line",
  paddingLeft: "0",
  paddingRight: "0",
};

const HotelDetailsTabs = (props) => {
  const [navTabValue, setNavTabValue] = useState("1");

  const { data, error, loaded, callAPI } = useAxios();

  const roomListURL = `${process.env.REACT_APP_FLASK_DOMAIN}/api/v1/hotels/${props.id}/rooms`;
  // const roomListURL = `http://127.0.0.1:5000/api/v1/hotels/${props.id}/rooms`;

  const handleTabChange = (event, newValue) => {
    setNavTabValue(newValue);
  };

  // When the page is loaded, fetch room details for current hotel
  useEffect(() => {
    callAPI(roomListURL);
  }, [props]);

  if (error) {
    console.log("error: ", error);
  }

  return (
    <>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={navTabValue}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleTabChange}
              aria-label="lab API tabs example"
            >
              <Tab label="Description" value="1" />
              <Tab label="Features" value="2" />
              <Tab label="Room & Price" value="3" />
              <Tab label="Review" value="4" />
            </TabList>
          </Box>
          {/* Description */}
          <TabPanel style={PaddingZeroStyle} value="1">
            {props.description}
          </TabPanel>
          {/* Features */}
          <TabPanel style={PaddingZeroStyle} value="2">
            <HotelFeatures
              features={props.features}
              amenities={props.amenities}
            />
          </TabPanel>
          {/* Room & Price */}
          <TabPanel style={PaddingZeroStyle} value="3">
            {!loaded && <Loader />}
            {loaded &&
              data.data.map((room) => (
                <RoomTypeCard
                  key={room.id}
                  price={room.cost}
                  room_type={room.room_type}
                />
              ))}
          </TabPanel>
          {/* Review */}
          <TabPanel style={PaddingZeroStyle} value="4">
            <ReviewTab hotel_id={props.id} />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

HotelDetailsTabs.propTypes = {
  id: PropTypes.number,
  description: PropTypes.string,
  features: PropTypes.array,
  amenities: PropTypes.array,
};

export default HotelDetailsTabs;
