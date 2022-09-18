import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// MUI
import { Alert, Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

// Custom Components
import HotelFeatures from "./HotelFeatures";
import RoomTypeCard from "./RoomTypeCard";
import ReviewTab from "./Tabs/ReviewTab";
import Loader from "../UI/Loader";

//redux
import { useSelector } from "react-redux";

import dayjs from "dayjs";
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
    setLoaded: setLoadedRoomList,
    callAPI: callAPIRoomList,
  } = useAxios();

  // const roomListURL = `http://127.0.0.1:5000/api/v1/hotels/${props.id}/rooms`;

  const handleTabChange = (event, newValue) => {
    setNavTabValue(newValue);
  };

  // When the page is loaded, fetch room details for current hotel
  useEffect(() => {
    setLoadedRoomList(false);
    if (checkInDate !== null && checkOutDate !== null) {
      const roomListURL = `${
        process.env.REACT_APP_FLASK_DOMAIN
      }/api/v1/hotels/${props.id}/rooms?check_in_date=${JSON.stringify(
        dayjs(JSON.parse(checkInDate)).add(1, "day")
      ).slice(1, 11)}&check_out_date=${JSON.stringify(
        dayjs(JSON.parse(checkOutDate)).add(1, "day")
      ).slice(1, 11)}`;
      callAPIRoomList(roomListURL);
    }
  }, [props.id, checkInDate, checkOutDate]);

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
            {checkInDate === null || checkOutDate === null ? (
              <Alert severity="error">
                Please enter Check In and Check Out dates first !
              </Alert>
            ) : (
              <>
                {loadedRoomList.data.length === 0 && (
                  <Alert severity="info">
                    No Rooms Available,Try changing the dates!
                  </Alert>
                )}
                {!loadedRoomList && <Loader />}
                {loadedRoomList &&
                  loadedRoomList.data.length > 0 &&
                  loadedRoomList &&
                  dataRoomList.data.map((room) => (
                    <RoomTypeCard
                      key={room.id}
                      price={room.cost}
                      isHiked={dataRoomList.isHiked}
                      isDiscountApplied={
                        !dataRoomList.isHiked &&
                        dayjs(JSON.parse(checkInDate)).diff(dayjs(), "day") ===
                          1
                          ? true
                          : false
                      }
                      room_type={room.room_type}
                      total_rooms={room.total_rooms}
                      available_rooms={room.available_rooms}
                      capacity={room.capacity_per_room}
                      id={room.id}
                    />
                  ))}
              </>
            )}
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
