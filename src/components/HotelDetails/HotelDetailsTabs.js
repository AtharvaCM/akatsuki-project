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

import { useSelector } from "react-redux";

// custom hooks
import { useAxios } from "../../hooks/useAxios";

const PaddingZeroStyle = {
  whiteSpace: "pre-line",
  paddingLeft: "0",
  paddingRight: "0",
};

const HotelDetailsTabs = (props) => {
  // selctor
  const { checkInDate, checkOutDate } = useSelector(
    (state) => state.searchHotel
  );

  const [navTabValue, setNavTabValue] = useState("1");

  const {
    data: dataRoomList,
    error: errorRoomList,
    loaded: loadedRoomList,
    callAPI: callAPIRoomList,
  } = useAxios();

  const roomListURL = `${process.env.REACT_APP_FLASK_DOMAIN}/api/v1/hotels/${
    props.id
  }/rooms?check_in_date=${checkInDate.slice(
    1,
    11
  )}&check_out_date=${checkOutDate.slice(1, 11)}`;
  // const roomListURL = `http://127.0.0.1:5000/api/v1/hotels/${props.id}/rooms`;

  console.log(checkInDate);
  const handleTabChange = (event, newValue) => {
    setNavTabValue(newValue);
  };

  // When the page is loaded, fetch room details for current hotel
  useEffect(() => {
    callAPIRoomList(roomListURL);
  }, [props.id]);

  if (loadedRoomList) {
    console.log(dataRoomList);
  }

  if (errorRoomList) {
    console.log("error: ", errorRoomList);
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
            {!loadedRoomList && <Loader />}
            {loadedRoomList &&
              dataRoomList.data.map((room) => (
                <RoomTypeCard
                  key={room.id}
                  price={
                    dataRoomList.isHiked
                      ? room.cost + Math.round(room.cost * 0.2)
                      : room.cost
                  }
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
