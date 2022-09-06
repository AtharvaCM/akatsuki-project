// Example for API calling

import React, { useMemo } from "react";

// custom hooks
import { useAxios } from "../hooks/useAxios";

const url = "https://reqres.in/api/users/2";
const method = "GET";
const payload = {};

const Home = () => {
  const { data, error, loaded } = useAxios(url, method, payload);

  const stringifiedData = useMemo(() => {
    return JSON.stringify(data || {});
  }, [data]);

  if (loaded) {
    return error ? <p>Something went wrong</p> : <p>Data ala</p>;
  }

  return <span>Loading...</span>;
};

export default Home;
