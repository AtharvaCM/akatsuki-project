import React from "react";

// MUI
import { Typography, Grid } from "@mui/material";

// Custom Components
import HotelHeader from "../components/HotelDetails/HotelHeader";
import HotelDetailsTabs from "../components/HotelDetails/HotelDetailsTabs";
import BreadCrumbs from "../components/BreadCrumbs/BreadCrumbs";

const hotel = {
  hotel_name: "The Leela Kovalam Kerala",
  rating: 4.19,
  number_of_reviews: 234,
  address: "Beach Road, Kovalam 695527 India",
  city: "Kovalam",
  state: "Kerala",
  images: [
    "https://res.cloudinary.com/difrv1tb6/image/upload/v1662047011/HotelBookingAppAssets/hotel_img_1_iraxyq.png",
    "https://res.cloudinary.com/difrv1tb6/image/upload/v1662047010/HotelBookingAppAssets/hotel_img_2_ohbigi.png",
    "https://res.cloudinary.com/difrv1tb6/image/upload/v1662047010/HotelBookingAppAssets/hotel_img_3_rv2rar.png",
    "https://res.cloudinary.com/difrv1tb6/image/upload/v1662047010/HotelBookingAppAssets/hotel_img_4_opv5np.png",
  ],
  description:
    "The Raviz Kovalam sits on a cliff, offering panoramic views of the Kovalam shoreline and the Arabian Sea. It is steps away from a private beach, and features a spa.\n Rooms at The Raviz Kovalam Beach combine wooden décor with modern amenities like a flat-screen TV and tea/coffee making facilities. Each room provides views of the garden or the sea.\n The outdoor pool and the fitness centre both overlook the sea. The Raviz Kovalam also has a game room and tennis court. Travel services include tour and ticketing arrangements and car rental.",

  features: [
    "Wi-fi",
    "Infinity Pool",
    "Golf Course",
    "Airport Shuttle",
    "On Call Doctor",
    "Covid safety Protocols ",
  ],

  amenities: [
    "Kins bed",
    "Bath tub",
    "Fire Extinguisher",
    "Complimentary drink",
    "Baby changing station",
    "Room Service",
    "Smat TV",
    "Laundary Service",
    "Deck",
    "Duty free",
    "Breakfast included",
    "Covid safety kit ",
  ],
};

const HotelDetailsPage = () => {
  return (
    <>
      <div style={{ padding: "2%" }}>
        <BreadCrumbs />
        <HotelHeader
          hotel_name={hotel.hotel_name}
          rating={hotel.rating}
          number_of_reviews={hotel.number_of_reviews}
          address={hotel.address}
          city={hotel.city}
          state={hotel.state}
          images={hotel.images}
        />
        <Grid container>
          <Grid item xs={12} md={7}>
            <HotelDetailsTabs
              description={hotel.description}
              features={hotel.features}
              amenities={hotel.amenities}
            />
          </Grid>
          <Grid item xs={12} md={1}></Grid>
          <Grid item xs={12} md={4}>
            <h2>Booking Box Here</h2>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default HotelDetailsPage;
