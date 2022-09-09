import React, { useEffect, useState } from "react";

// MUI
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

// react router
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// custom components
import HotelListCard from "../components/HotelListCard/HotelListCard";
import BreadCrumbs from "../components/BreadCrumbs/BreadCrumbs";
import SearchWidget from "../components/SearchWidget/SearchWidget";
import Loader from "../components/Loader";

// custom hooks for API
import { useAxios } from "../hooks/useAxios";

// paths
// import { ROUTES } from "../utils/constants/routingPathConstants";
import Typography from "@mui/material/Typography";

const hotelListURL = `${process.env.REACT_APP_FLASK_DOMAIN}/api/v1/hotels/`;

const HotelListPage = () => {
  const {
    location: searchedLocation,
    checkInDate: searchedCheckInDate,
    checkOutDate: searchedCheckOutDate,
  } = useSelector((state) => state.searchHotel);

  const [hotelList, setHotelList] = useState(null);

  // get the state from prev page
  const navigate = useNavigate();

  const {
    data: hotel_list_data,
    error,
    loaded,
    isLoading,
    callAPI,
    setLoaded,
  } = useAxios();

  useEffect(() => {
    callAPI(`${hotelListURL}?location=${searchedLocation}`);

    if (hotel_list_data) {
      setHotelList(hotel_list_data.data);
    }
  }, [searchedLocation, hotel_list_data]);

  if (error) {
    console.log(error);
  }

  // // if API call finished
  // useEffect(() => {
  //   if (!isLoading) {
  //     console.log("hotelList: ", hotel_list_data);

  //   }
  // }, [isLoading, searchedLocation, hotel_list_data]);

  return (
    <Container sx={{ mb: 5 }}>
      <BreadCrumbs activePage="Hotel List" />
      <SearchWidget />

      {/* hotels map */}
      {isLoading && <Loader />}
      {searchedLocation == null && (
        <Typography
          variant="h4"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "2%",
          }}
        >
          Search for hotels above...
        </Typography>
      )}
      {!isLoading &&
        hotelList &&
        hotelList.map((hotel) => (
          <HotelListCard
            key={hotel.id}
            id={hotel.id}
            name={hotel.name}
            country={hotel.country}
            state={hotel.state}
            hotel_dp={hotel.hotel_dp}
            address={hotel.address}
            check_in_date={searchedCheckInDate.substring(1, 11)}
            check_out_date={searchedCheckOutDate.substring(1, 11)}
            ratings={hotel.ratings}
            reviews_count={234}
            departure="Kochi"
            price={720}
            capacity="Two"
            room_images={hotel.room_images}
          />
        ))}

      {/* View More Button */}
      {searchedLocation !== null && (
        <Box sx={styles.box} component="div">
          <Button variant="outlined" style={styles.ViewAllButton}>
            View More
          </Button>
        </Box>
      )}
    </Container>
  );
};

const styles = {
  box: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  ViewAllButton: {
    borderRadius: "30px",
    width: "240px",
    height: "60px",
    color: "black",
    fontWeight: "600",
    fontSize: "23px",
    borderColor: "#9F9FA4",
    textTransform: "none",
  },
};

export default HotelListPage;
