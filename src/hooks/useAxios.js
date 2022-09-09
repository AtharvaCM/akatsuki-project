// a custom hook for making http requests

import { useRef, useState } from "react";

import axios from "axios";

export const useAxios = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  const controllerRef = useRef(new AbortController());
  const cancel = () => {
    controllerRef.current.abort();
  };

  const callAPI = async (url, method = "GET", payload = {}) => {
    try {
      const response = await axios.request({
        data: payload,
        signal: controllerRef.current.signal,
        method,
        url,
      });
      setData(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoaded(true);
    }
  };

  return { cancel, data, error, loaded, callAPI, setLoaded };
};
