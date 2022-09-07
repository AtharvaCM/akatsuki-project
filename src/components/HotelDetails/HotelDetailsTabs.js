import React, { useState } from "react";
import PropTypes from "prop-types";

// MUI
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

// Custom Components
import HotelFeatures from "./HotelFeatures";
import AddReview from "./AddReview";
import ViewReview from "./ViewReview";
import RoomTypeCard from "./RoomTypeCard";

const PaddingZeroStyle = {
  paddingLeft: "0",
  paddingRight: "0",
};

const HotelDetailsTabs = (props) => {
  const [navTabValue, setNavTabValue] = useState("1");
  const handleTabChange = (event, newValue) => {
    setNavTabValue(newValue);
  };
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
          <TabPanel style={PaddingZeroStyle} value="1">
            {props.description}
          </TabPanel>
          <TabPanel style={PaddingZeroStyle} value="2">
            <HotelFeatures
              features={props.features}
              amenities={props.amenities}
            />
          </TabPanel>
          <TabPanel style={PaddingZeroStyle} value="3">
            <RoomTypeCard />
          </TabPanel>
          <TabPanel style={PaddingZeroStyle} value="4">
            <AddReview />
            <ViewReview />
            <ViewReview />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

HotelDetailsTabs.propTypes = {
  description: PropTypes.string,
  features: PropTypes.array,
  amenities: PropTypes.array,
};

export default HotelDetailsTabs;
