import React from "react";

import { Routes, Route } from "react-router-dom";

// Pages
import AxiosDemo from "../components/AxiosDemo";
import ReduxDemo from "../components/ReduxDemo";

const Router = () => {
  return (
    <Routes>
      <Route index path="/" element={<AxiosDemo />}></Route>
      <Route path="/redux" element={<ReduxDemo />}></Route>
    </Routes>
  );
};

export default Router;

