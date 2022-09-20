import React, { useEffect } from "react";

// MUI
import { Grid } from "@mui/material";

// Custom Components
import HotelHeader from "../components/HotelDetails/HotelHeader";
import HotelDetailsTabs from "../components/HotelDetails/HotelDetailsTabs";
import HotelBookingCard from "../components/HotelDetails/HotelBookingCard";
import BreadCrumbs from "../components/BreadCrumbs/BreadCrumbs";
import Loader from "../components/UI/Loader";

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

// const amenities = [
//   "Kins bed",
//   "Bath tub",
//   "Fire Extinguisher",
//   "Complimentary drink",
//   "Baby changing station",
//   "Room Service",
//   "Smart TV",
//   "Laundary Service",
//   "Deck",
//   "Duty free",
//   "Breakfast included",
//   "Covid safety kit",
// ];

const BreadCrumbsData = [{ label: "Hotel List", route: ROUTES.HOTEL_LIST }];

const HotelDetailsPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const {
    data: dataHotelDetails,
    error: errorHotelDetails,
    loaded: loadedHotelDetails,
    callAPI: callAPIHotelDetails,
  } = useAxios();
  const {
    data: dataHotelExtraFeatures,
    error: errorHotelExtraFeatures,
    loaded: loadedHotelExtraFeatures,
    callAPI: callAPIHotelExtraFeatures,
  } = useAxios();
  const {
    error: errorHotelRecommendations,
    loaded: loadedHotelRecommendations,
    callAPI: callAPIHotelRecommendations,
  } = useAxios();

  // get hotel id from url
  const hotel_id = location.pathname.split("/").at(-1);

  // user_id
  const user_id = 2;

  // URLs
  const HotelDetailsURL = `${process.env.REACT_APP_FLASK_DOMAIN}/api/v1/hotels/${hotel_id}`;
  const HotelExtraFeaturesURL = `${process.env.REACT_APP_FLASK_DOMAIN}/api/v1/hotels/${hotel_id}/extrafeatures`;
  const HotelRecommendationsURL = `${process.env.REACT_APP_FLASK_DOMAIN}/api/v1/recommendation/hotel`;
  // const HotelRecommendationsURL = "http://127.0.0.1:5000/api/v1/recommendation/hotel";

  const {
    hotel_name,
    state,
    city,
    address,
    description,
    features,
    amenities,
    ratings,
    reviews_count,
    room_images,
  } = useSelector((state) => state.hotelDetails);

  // On load, call GET hotel details API and POST search hotel API
  useEffect(() => {
    // GET hotel details
    callAPIHotelDetails(HotelDetailsURL);
    // GET hotel extraFeatures
    callAPIHotelExtraFeatures(HotelExtraFeaturesURL);
    // POST hotel recommendation
    const payload = JSON.stringify({
      user_id: user_id,
      hotel_id: hotel_id,
    });
    callAPIHotelRecommendations(HotelRecommendationsURL, "POST", payload);
  }, []);

  // when recommendations are received from API, store them
  useEffect(() => {}, [loadedHotelRecommendations]);

  // when hotel details are recieved from API, dispatch an action to redux
  useEffect(() => {
    if (loadedHotelDetails && dataHotelDetails.data) {
      dispatch(
        setHotelDetails({
          id: dataHotelDetails.data.id,
          name: dataHotelDetails.data.name,
          state: dataHotelDetails.data.state,
          city: dataHotelDetails.data.city,
          address: dataHotelDetails.data.address,
          description: dataHotelDetails.data.description,
          features: dataHotelDetails.data.features,
          amenities: dataHotelDetails.data.amenities,
          ratings: dataHotelDetails.data.ratings,
          reviews_count: 234,
          room_images: dataHotelDetails.data.room_images,
        })
      );
    }
  }, [loadedHotelDetails]);

  // errors
  if (errorHotelExtraFeatures) {
    console.log("errorHotelExtraFeatures: ", errorHotelExtraFeatures);
  }

  if (errorHotelDetails) {
    console.log("errorHotelDetails: ", errorHotelDetails);
  }

  if (errorHotelRecommendations) {
    console.log("errorHotelRecommendations: ", errorHotelRecommendations);
  }

  return (
    <>
      {/* Loader */}
      {!loadedHotelDetails && <Loader />}
      {loadedHotelDetails && dataHotelDetails.data && (
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
            {/* Hotel Details Grid */}
            <Grid item xs={12} md={7}>
              <HotelDetailsTabs
                description={description}
                features={features}
                amenities={amenities}
                id={+hotel_id}
              />
            </Grid>

            {/* Empty Grid for spacing */}
            <Grid item xs={12} md={1}></Grid>

            {/* Booking Card Grid */}
            {!loadedHotelExtraFeatures && <Loader />}
            {loadedHotelExtraFeatures && (
              <Grid item xs={12} md={4}>
                <HotelBookingCard
                  extraFeatures={dataHotelExtraFeatures.data}
                  hotel_name={hotel_name}
                />
              </Grid>
            )}
          </Grid>
        </div>
      )}
    </>
  );
};

export default HotelDetailsPage;
