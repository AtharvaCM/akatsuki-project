import React, { useEffect } from "react";

// MUI
import Container from "@mui/material/Container";

// react router
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// custom components
import HotelListCard from "../components/HotelListCard/HotelListCard";
import BreadCrumbs from "../components/BreadCrumbs/BreadCrumbs";

// custom hooks for API
import { useAxios } from "../hooks/useAxios";

// paths
import { ROUTES } from "../utils/constants/routingPathConstants";
import SearchWidget from "../components/SearchWidget/SearchWidget";
import { Button } from "@mui/material";

const URL = "http://localhost:5000/api/v1/hotels/";

const HotelListPage = () => {
  const {
    location: searchedLocation,
    checkInDate: searchedCheckInDate,
    checkOutDate: searchedCheckOutDate,
  } = useSelector((state) => state.searchHotel);

  // get the state from prev page
  // const location = useLocation();
  const navigate = useNavigate();

  const { data: hotel_list_data, error, loaded, callAPI } = useAxios();

  useEffect(() => {
    // set the initial state
    if (searchedLocation === null) {
      // console.log("Here is me");
      navigate(ROUTES.HOME);
    }
    // else {
    //   callAPI(
    //     `${URL}?location=${searchedLocation}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`
    //   );
    // }
  }, []);
  console.log(searchedLocation, searchedCheckInDate, searchedCheckOutDate);

  if (error) {
    console.log(error);
  }

  // if API call finished
  if (loaded) {
    console.log("hotelList: ", hotel_list_data);
  }

  return (
    <Container sx={{ mb: 5 }}>
      <BreadCrumbs activePage="Hotel List" />
      <SearchWidget />
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
      <Button variant="outlined" style={styles.ViewAllButton}>View More</Button>
    </Container>
  );
};

const styles = {
  ViewAllButton:{
    borderRadius:"30px",
    width:"240px",
    height:"60px",
    marginTop:"30px",
    marginLeft:"60%",
    color:"black",
    fontWeight:"600",
    fontSize:"23px",
    borderColor:"#9F9FA4",
    textTransform:"none"
  }
}

export default HotelListPage;
