import React from "react";
import { Link as LinkDom } from "react-router-dom";

// MUI
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";

// MUI icons
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

// CSS
import styles from "./BreadCrumbs.module.css";

const BreadCrumbs = () => {
  const breadcrumbs = [
    <LinkDom key="1" to="/" className={styles.link}>
      Home
    </LinkDom>,
    <LinkDom key="1" to="/hotel-list" className={styles.link}>
      Hotel List
    </LinkDom>,
    <Typography className={styles.activelink} key="3">
      Hotel Details
    </Typography>,
  ];

  return (
    <>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        style={{ margin: "1% 0" }}
      >
        {breadcrumbs}
      </Breadcrumbs>
    </>
  );
};

export default BreadCrumbs;
