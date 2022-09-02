import React from "react";
import { Link as LinkDom } from "react-router-dom";

// MUI
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

// MUI icons
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

// CSS
import styles from "./BreadCrumbs.module.css";

const BreadCrumbs = () => {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit">
      <LinkDom to="/" className={styles.link}>
        Home
      </LinkDom>
    </Link>,
    <Link key="2" underline="hover" color="inherit">
      <LinkDom to="/hotel-list" className={styles.link}>
        Hotel List
      </LinkDom>
    </Link>,

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
