import React from "react";

import { Routes, Route } from "react-router-dom";
import Home from "../components/Home";

const Router = () => {
  return (
    <Routes>
      <Route index path="/" element={<Home />}></Route>
    </Routes>
  );
};

export default Router;

