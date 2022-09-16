import React from "react";

// Custom Components
import SearchWidget from "../components/SearchWidget/SearchWidget";
import HomeHeadline from "../components/HomeHeadline/HomeHeadline";
import HotelRecommendation from "../components/Recommendations/HotelRecommendation";

const HomePage = () => {
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
