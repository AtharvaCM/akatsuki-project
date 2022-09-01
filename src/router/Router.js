import React from "react";

import { Routes, Route } from "react-router-dom";

// Pages
import AxiosDemo from "../components/AxiosDemo";
import ReduxDemo from "../components/ReduxDemo";
import HotelListPage from "../pages/HotelListPage";

// import paths from routingPathConstants
// paths
import { ROUTES } from "../utils/constants/routingPathConstants";

const Router = () => {
  return (
    <Routes>
      <Route index path={ROUTES.HOME} element={<AxiosDemo />}></Route>
      <Route index path={ROUTES.HOTEL_LIST} element={<HotelListPage />}></Route>
      <Route path="/redux" element={<ReduxDemo />}></Route>
    </Routes>
  );
};

export default Router;

