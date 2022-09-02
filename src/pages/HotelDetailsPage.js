import React from "react";
import HotelHeader from "../components/HotelDetails/HotelHeader";
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
      </div>
    </>
  );
};

export default HotelDetailsPage;
