import React from "react";

import { Routes, Route } from "react-router-dom";

// Pages
import HotelListPage from "../pages/HotelListPage";
import HomePage from "../pages/HomePage";
import HotelDetailsPage from "../pages/HotelDetailsPage";
import ConfirmationPage from "../pages/ConfirmationPage";

// import paths from routingPathConstants
// paths
import { ROUTES } from "../utils/constants/routingPathConstants";

const Router = () => {
  return (
    <Routes>
      <Route index exact path={ROUTES.HOME} element={<HomePage />} />
      <Route index path={ROUTES.HOTEL_LIST} element={<HotelListPage />} />
      <Route
        exact
        path={`${ROUTES.HOTEL_DETAILS}/:id`}
        element={<HotelDetailsPage />}
      />
      <Route
        exact
        path={ROUTES.BOOKING_CONFIRMATION}
        element={<ConfirmationPage />}
      />
    </Routes>
  );
};

export default Router;
