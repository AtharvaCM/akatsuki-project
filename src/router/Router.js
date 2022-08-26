import React from "react";

import { Routes, Route } from "react-router-dom";

const Router = () => {
  return (
    <Routes>
      <Route index path="/" element={<p>Home Page</p>}></Route>
    </Routes>
  );
};

export default Router;
