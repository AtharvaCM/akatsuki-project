import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// Custom Components
import HotelRecommendationCard from "./HotelRecommendationCard";

// redux
// import { useSelector } from "react-redux";

// Custom Hook
import { useAxios } from "../../hooks/useAxios";

const HotelRecommendation = () => {
  const { data, loaded, error, callAPI } = useAxios();

  // states
  const [recommendedHotels, setRecommendedHotels] = useState(null);

  // selector
  // const { user_id } = useSelector((state) => state.login);
  const user_id = 2;

  // const hotelRecommendationURL = `${process.env.REACT_APP_FLASK_DOMAIN}/api/v1/recommendation/hotel?id=${user_id}`;
  const hotelRecommendationURL = `http://127.0.0.1:5000/api/v1/recommendation/hotel?id=${user_id}`;

  // on load, call the API  to  check if there are any recommendations available
  useEffect(() => {
    callAPI(hotelRecommendationURL);
  }, []);

  // once the API call is done, check if any hotels are present in the response
  useEffect(() => {
    // list present
    if (loaded !== null) {
      data !== null && setRecommendedHotels(data.data);
    }
  }, [loaded]);

  if (error) {
    console.log("error: ", error);
  }

  console.log("data: ", data);

  // if no recommendations are available, return an empty response
  if (recommendedHotels === null) {
    return <></>;
  }

  return (
    <Box style={styles.container}>
      {/* Title */}
      <Typography style={{ textAlign: "center" }} variant="h4" gutterBottom>
        Recommended Hotels For You
      </Typography>

      {/* Card Container */}
      <Box style={styles.cardContainer}>
        {loaded &&
          recommendedHotels !== null &&
          recommendedHotels.map((hotel) => (
            <HotelRecommendationCard
              key={+hotel.hotel_id + +user_id}
              hotelName={hotel.name}
              avgRating={hotel.ratings}
              price={hotel.price}
              hotelDp={hotel.hotel_dp}
              hotelId={hotel.id}
            />
          ))}
      </Box>
    </Box>
  );
};

const styles = {
  container: {
    height: "455px",
    // backgroundColor: "#EAEAEB",
    width: "100%",
    padding: "5px",
    marginTop: "150px",
  },
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
};

export default HotelRecommendation;
