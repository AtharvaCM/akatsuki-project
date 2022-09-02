import React from "react";

import { Routes, Route } from "react-router-dom";

// Pages
import AxiosDemo from "../components/AxiosDemo";
import ReduxDemo from "../components/ReduxDemo";
import HomePage from "../pages/HomePage";

// import paths from routingPathConstants
// paths
import { ROUTES } from "../utils/constants/routingPathConstants";

const Router = () => {
  return (
    <Routes>
      <Route index exact path={ROUTES.HOME} element={<HomePage />} />
      <Route path="/redux" element={<ReduxDemo />}></Route>
      <Route path="/axios" element={<AxiosDemo />}></Route>
    </Routes>
  );
};

export default Router;
