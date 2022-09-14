import React from "react";
import PropTypes from "prop-types";

// MUI
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Loader = (props) => {
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
        <Typography variant="h4">{props.text ?? "Loading"}</Typography>
      </Box>
    </>
  );
};

Loader.propTypes = {
  text: PropTypes.string,
};

export default Loader;
