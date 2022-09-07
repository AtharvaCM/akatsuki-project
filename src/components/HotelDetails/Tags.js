import React from "react";
import { Alert } from "@mui/material";

const tagwidthStyle = {
  width: "fit-content",
  display: "inline-block",
  marginRight: "1%",
  padding: "0 1rem",
  fontSize: "8px",
};

const Tags = () => {
  return (
    <>
      <Alert
        icon={false}
        severity="success"
        color="success"
        style={tagwidthStyle}
      >
        5.0
      </Alert>
      <Alert
        icon={false}
        severity="warning"
        color="warning"
        style={tagwidthStyle}
      >
        Perfect
      </Alert>
      <Alert icon={false} severity="info" color="info" style={tagwidthStyle}>
        Hotels
      </Alert>
      <Alert icon={false} severity="error" color="error" style={tagwidthStyle}>
        Top Value
      </Alert>
      <Alert
        icon={false}
        severity="warning"
        color="warning"
        style={tagwidthStyle}
      >
        Building
      </Alert>
    </>
  );
};

export default Tags;
