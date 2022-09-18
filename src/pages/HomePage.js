import React from "react";

// Custom Components
import SearchWidget from "../components/SearchWidget/SearchWidget";
import HomeHeadline from "../components/HomeHeadline/HomeHeadline";
import HotelRecommendation from "../components/Recommendations/HotelRecommendation";
import LocationRecommendation from "../components/Recommendations/LocationRecommendation";

const HomePage = () => {
  // enable body overflow
  document.body.style.overflow = "auto";

  return (
    <>
      <div>
        <HomeHeadline />
      </div>
      <div style={searchWidgetStyle}>
        <SearchWidget />
      </div>
      {/* Recommendation Section */}
      <section>
        <LocationRecommendation />
      </section>
      <section>
        <HotelRecommendation />
      </section>
    </>
  );
};
const searchWidgetStyle = {
  position: "relative",
  margin: "-9% 5%",
};
export default HomePage;
