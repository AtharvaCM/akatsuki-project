import React, { useEffect, useState } from "react";

// MUI
import Container from "@mui/material/Container";

// react router
import { useLocation } from "react-router-dom";

// custom components
import HotelListCard from "../components/HotelListCard/HotelListCard";

const HotelListPage = () => {
  // get the state from prev page
  const location = useLocation();

  // react states
  const [hotelList, setHotelList] = useState([]);

  useEffect(() => {
    // set the initial state
    setHotelList(location.state);
    console.log("location.state: ", location.state);
  }, []);

  console.log("hotelList: ", hotelList);

  return (
    <Container sx={{ mb: 5 }}>
      <HotelListCard
        id={1}
        hotel_name="The Leela Kovalam"
        country="India"
        state="Kerala"
        img_src="https://res.cloudinary.com/difrv1tb6/image/upload/v1662018316/HotelBookingAppAssets/LeelaKovalam_DP_tmylk2.png"
        address="Beach Road, Kovalam 695527 India"
        check_in_date="15.09.2022"
        check_out_date="20.09.2022"
        rating={4.19}
        reviews_count={234}
        departure="Kochi"
        price={720}
        capacity="Two"
      />
    </Container>
  );
};

export default HotelListPage;
