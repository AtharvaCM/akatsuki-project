import React, { useEffect } from "react";

// MUI
import { Grid } from "@mui/material";

// Custom Components
import HotelHeader from "../components/HotelDetails/HotelHeader";
import HotelDetailsTabs from "../components/HotelDetails/HotelDetailsTabs";
import HotelBookingCard from "../components/HotelDetails/HotelBookingCard";
import BreadCrumbs from "../components/BreadCrumbs/BreadCrumbs";

// path constants
import { ROUTES } from "../utils/constants/routingPathConstants";
import { useLocation } from "react-router-dom";
// redux
import { useDispatch } from "react-redux";
// redux
import { useSelector } from "react-redux";

// custom hooks
import { useAxios } from "../hooks/useAxios";

// actions
import { setHotelDetails } from "../store/hotelDetailsSlice";
import Loader from "../components/UI/Loader";

const amenities = [
  "Kins bed",
  "Bath tub",
  "Fire Extinguisher",
  "Complimentary drink",
  "Baby changing station",
  "Room Service",
  "Smart TV",
  "Laundary Service",
  "Deck",
  "Duty free",
  "Breakfast included",
  "Covid safety kit",
];

const BreadCrumbsData = [{ label: "Hotel List", route: ROUTES.HOTEL_LIST }];

const HotelDetailsPage = () => {
  const dispatch = useDispatch();
  const { data, error, loaded, callAPI } = useAxios();
  const location = useLocation();
  const hotel_id = location.pathname.split("/").at(-1);
  // .toString()[-1]

  const HotelDetailsURL = `${process.env.REACT_APP_FLASK_DOMAIN}/api/v1/hotels/${hotel_id}`;

  const {
    id,
    hotel_name,
    state,
    city,
    address,
    description,
    features,
    ratings,
    reviews_count,
    room_images,
    // amenities,
  } = useSelector((state) => state.hotelDetails);

  useEffect(() => {
    callAPI(HotelDetailsURL);
  }, []);

  useEffect(() => {
    if (loaded) {
      dispatch(
        setHotelDetails({
          id: data.data.id,
          name: data.data.name,
          state: data.data.state,
          city: data.data.city,
          address: data.data.address,
          description: data.data.description,
          features: data.data.features,
          ratings: data.data.ratings,
          reviews_count: 234,
          room_images: data.data.room_images,
        })
      );
    }
  }, [loaded]);

  return (
    <>
      {!loaded && <Loader />}
      {loaded && data.data && (
        <div style={{ padding: "2%" }}>
          <BreadCrumbs data={BreadCrumbsData} activePage="Hotel Details" />
          <HotelHeader
            name={hotel_name}
            ratings={ratings}
            number_of_reviews={reviews_count}
            address={address}
            city={city}
            state={state}
            room_images={room_images}
          />
          <Grid container>
            <Grid item xs={12} md={7}>
              <HotelDetailsTabs
                description={description}
                features={features}
                amenities={amenities}
                id={+id}
              />
            </Grid>
            <Grid item xs={12} md={1}></Grid>
            <Grid item xs={12} md={4}>
              <HotelBookingCard />
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
};

export default HotelDetailsPage;
