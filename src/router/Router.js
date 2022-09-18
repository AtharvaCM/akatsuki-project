import React from "react";
import PropTypes from "prop-types";

import { Routes, Route, Navigate, Outlet } from "react-router-dom";

// Pages
import HotelListPage from "../pages/HotelListPage";
import HomePage from "../pages/HomePage";
import HotelDetailsPage from "../pages/HotelDetailsPage";
import ConfirmationPage from "../pages/ConfirmationPage";
import LoginPage from "../pages/LoginPage";

// import paths from routingPathConstants
// paths
import { ROUTES } from "../utils/constants/routingPathConstants";

// redux
import { useSelector } from "react-redux";
import Fallback404 from "../components/UI/Fallback404";

// access only when user is authenticated
const ProtectedRoute = ({ isAuthenticated, children }) => {
  // enable body overflow
  document.body.style.overflow = "auto";

  if (isAuthenticated === false || isAuthenticated === null) {
    return <Navigate to={ROUTES.LOGIN_PAGE} replace />;
  }

  ProtectedRoute.propTypes = {
    isAuthenticated: PropTypes.bool,
    children: PropTypes.any,
  };

  return children ? children : <Outlet />;
};

const Router = () => {
  // selector
  const { isAuthenticated } = useSelector((state) => state.login);
  console.log("isAuthenticated: ", isAuthenticated);

  return (
    <Routes>
      <Route exact path={ROUTES.LOGIN_PAGE} element={<LoginPage />} />

      <Route index exact path={ROUTES.HOME} element={<HomePage />} />
      {/* Protected routes */}
      <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
        <Route path={ROUTES.HOTEL_LIST} element={<HotelListPage />} />
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
      </Route>

      {/* 404 */}
      <Route path="*" element={<Fallback404 />} />
    </Routes>
  );
};

export default Router;
