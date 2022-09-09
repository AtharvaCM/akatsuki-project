import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Loader = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "2%",
        }}
      >
        <CircularProgress />
        <Typography variant="h4">Loading</Typography>
      </Box>
    </>
  );
};

export default Loader;
