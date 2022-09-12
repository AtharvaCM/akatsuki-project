import React from "react";

import { Routes, Route } from "react-router-dom";

// Pages
import AxiosDemo from "../components/AxiosDemo";
import ReduxDemo from "../components/ReduxDemo";
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
      <Route path="/redux" element={<ReduxDemo />}></Route>
      <Route path="/axios" element={<AxiosDemo />}></Route>
    </Routes>
  );
};

export default Router;
