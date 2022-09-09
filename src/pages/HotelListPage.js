import React, { useEffect, useState } from "react";

// MUI
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// redux
import { useSelector } from "react-redux";

// custom hooks for API
import { useAxios } from "../hooks/useAxios";

// custom components
import HotelListCard from "../components/HotelListCard/HotelListCard";
import BreadCrumbs from "../components/BreadCrumbs/BreadCrumbs";
import SearchWidget from "../components/SearchWidget/SearchWidget";
import Loader from "../components/UI/Loader";

const hotelListURL = `${process.env.REACT_APP_FLASK_DOMAIN}/api/v1/hotels/`;

const HotelListPage = () => {
  const {
    location: searchedLocation,
    checkInDate: searchedCheckInDate,
    checkOutDate: searchedCheckOutDate,
  } = useSelector((state) => state.searchHotel);

  const [hotelList, setHotelList] = useState([]);
  const [page, setPage] = useState(1);

  const {
    data: hotel_list_data,
    error,
    loaded,
    callAPI,
    setLoaded,
  } = useAxios();

  useEffect(() => {
    if (searchedLocation !== null) {
      (async () => {
        setLoaded(false);
        callAPI(`${hotelListURL}?location=${searchedLocation}`);
      })();
    }
  }, [searchedLocation]);

  if (error) {
    console.log(error);
  }

  // if API call finished
  useEffect(() => {
    if (loaded) {
      setHotelList((prevState) => [...prevState, ...hotel_list_data.data]);
    }
  }, [loaded]);

  const handleViewMore = () => {
    // call api with next page count
    (async () => {
      callAPI(`${hotelListURL}?location=${searchedLocation}&page=${page + 1}`);
      setLoaded(false);
    })();
    // increment page count
    setPage((prevState) => prevState + 1);
  };

  return (
    <Container sx={{ mb: 5 }}>
      <BreadCrumbs activePage="Hotel List" />
      <SearchWidget />

      {searchedLocation == null && loaded && <Loader />}
      {searchedLocation == null && (
        <Typography variant="h4" sx={styles.searchText}>
          Search for hotels above...
        </Typography>
      )}
      {/* hotels map */}
      {hotelList.length > 0 &&
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
      {hotelList.length !== 0 && hotel_list_data.has_next && (
        <Box sx={styles.box} component="div">
          <Button
            variant="outlined"
            style={styles.viewAllButton}
            onClick={handleViewMore}
          >
            View More
          </Button>
        </Box>
      )}
    </Container>
  );
};

const styles = {
  searchText: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "2%",
  },
  box: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  viewAllButton: {
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
