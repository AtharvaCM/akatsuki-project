// Example for API calling

import React from "react";

// custom hooks
import { useAxios } from "../hooks/useAxios";

const url = "https://reqres.in/api/users/2";
const method = "GET";
const payload = {};

const Home = () => {
  const { error, loaded } = useAxios(url, method, payload);

  if (loaded) {
    return error ? <p>Something went wrong</p> : <p>Data ala</p>;
  }

  return <span>Loading...</span>;
};

export default Home;
